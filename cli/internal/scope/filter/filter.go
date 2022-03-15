package filter

import (
	"fmt"
	"path/filepath"
	"strings"

	"github.com/bmatcuk/doublestar/v4"
	"github.com/pkg/errors"
	"github.com/pyr-sh/dag"
	"github.com/vercel/turborepo/cli/internal/fs"
	"github.com/vercel/turborepo/cli/internal/scm"
	"github.com/vercel/turborepo/cli/internal/util"
)

type SelectedPackages struct {
	pkgs          util.Set
	unusedFilters []*TargetSelector
}

type Resolver struct {
	Graph        *dag.AcyclicGraph
	PackageInfos map[interface{}]*fs.PackageJSON
	SCM          scm.SCM
	Cwd          string
}

func (r *Resolver) GetPackagesFromPatterns(patterns []string) (util.Set, error) {
	selectors := []*TargetSelector{}
	for _, pattern := range patterns {
		selector, err := ParseTargetSelector(pattern, r.Cwd)
		if err != nil {
			return nil, err
		}
		selectors = append(selectors, &selector)
	}
	selected, err := r.GetFilteredPackages(selectors)
	if err != nil {
		return nil, err
	}
	return selected.pkgs, nil
}

func (r *Resolver) GetFilteredPackages(selectors []*TargetSelector) (*SelectedPackages, error) {
	prodPackageSelectors := []*TargetSelector{}
	allPackageSelectors := []*TargetSelector{}
	for _, selector := range selectors {
		if selector.followProdDepsOnly {
			prodPackageSelectors = append(prodPackageSelectors, selector)
		} else {
			allPackageSelectors = append(allPackageSelectors, selector)
		}
	}
	if len(allPackageSelectors) > 0 || len(prodPackageSelectors) > 0 {
		if len(allPackageSelectors) > 0 {
			selected, err := r.filterGraph(allPackageSelectors)
			if err != nil {
				return nil, err
			}
			return selected, nil
		}
	}
	return nil, errors.New("not yet implemented")
}

func (r *Resolver) filterGraph(selectors []*TargetSelector) (*SelectedPackages, error) {
	includeSelectors := []*TargetSelector{}
	excludeSelectors := []*TargetSelector{}
	for _, selector := range selectors {
		if selector.exclude {
			excludeSelectors = append(excludeSelectors, selector)
		} else {
			includeSelectors = append(includeSelectors, selector)
		}
	}
	include, err := r.filterGraphWithSelectors(includeSelectors)
	if err != nil {
		return nil, err
	}
	exclude, err := r.filterGraphWithSelectors(excludeSelectors)
	if err != nil {
		return nil, err
	}
	return &SelectedPackages{
		pkgs:          include.pkgs.Difference(exclude.pkgs),
		unusedFilters: append(include.unusedFilters, exclude.unusedFilters...),
	}, nil
}

func (r *Resolver) filterGraphWithSelectors(selectors []*TargetSelector) (*SelectedPackages, error) {
	unmatchedSelectors := []*TargetSelector{}

	cherryPickedPackages := make(dag.Set)
	walkedDependencies := make(dag.Set)
	walkedDependents := make(dag.Set)
	walkedDependentsDependencies := make(dag.Set)

	for _, selector := range selectors {
		// TODO(gsoltis): this should be a list?
		entryPackages := make(util.Set)
		selectorWasUsed := false
		if selector.diff != "" {
			// get changed packaged
			selectorWasUsed = true
			changedFiles := r.SCM.ChangedFiles(selector.diff, true, r.Cwd)
			entryPackages = GetChangedPackages(changedFiles, r.PackageInfos)
		} else if selector.parentDir != "" {
			// get packages by path
			selectorWasUsed = true
			parentDir := filepath.Join(r.Cwd, selector.parentDir)
			for name, pkg := range r.PackageInfos {
				if matches, err := doublestar.PathMatch(parentDir, pkg.Dir); err != nil {
					return nil, fmt.Errorf("failed to resolve directory relationship %v contains %v: %v", selector.parentDir, pkg.Dir, err)
				} else if matches {
					entryPackages.Add(name.(string))
				}
			}
		}
		if selector.namePattern != "" {
			selectorWasUsed = true
			// find packages that match name
			if entryPackages.Len() == 0 {
				matched, err := matchPackageNamesToVertices(selector.namePattern, r.Graph.Vertices())
				if err != nil {
					return nil, err
				}
				entryPackages = matched
			} else {
				matched, err := matchPackageNames(selector.namePattern, entryPackages)
				if err != nil {
					return nil, err
				}
				entryPackages = matched
			}
		}
		// TODO(gsoltis): we can do this earlier
		// Check if the selector specified anything
		if !selectorWasUsed {
			return nil, fmt.Errorf("invalid selector: %v", selector.raw)
		}
		if entryPackages.Len() == 0 {
			unmatchedSelectors = append(unmatchedSelectors, selector)
		}
		for _, pkg := range entryPackages {
			if selector.includeDependencies {
				dependencies, err := r.Graph.Ancestors(pkg)
				if err != nil {
					return nil, errors.Wrapf(err, "failed to get dependencies of package %v", pkg)
				}
				for dep := range dependencies {
					walkedDependencies.Add(dep)
				}
				if !selector.excludeSelf {
					walkedDependencies.Add(pkg)
				}
			}
			if selector.includeDependents {
				dependents, err := r.Graph.Descendents(pkg)
				if err != nil {
					return nil, errors.Wrapf(err, "failed to get dependents of package %v", pkg)
				}
				for dep := range dependents {
					walkedDependents.Add(dep)
					if selector.includeDependencies {
						dependentDeps, err := r.Graph.Ancestors(dep)
						if err != nil {
							return nil, errors.Wrapf(err, "failed to get dependencies of dependent %v", dep)
						}
						for dependentDep := range dependentDeps {
							walkedDependentsDependencies.Add(dependentDep)
						}
					}
				}
				if !selector.excludeSelf {
					walkedDependents.Add(pkg)
				}
			}
			if !selector.includeDependencies && !selector.includeDependents {
				cherryPickedPackages.Add(pkg)
			}
		}
	}
	allPkgs := make(util.Set)
	for pkg := range cherryPickedPackages {
		allPkgs.Add(pkg)
	}
	for pkg := range walkedDependencies {
		allPkgs.Add(pkg)
	}
	for pkg := range walkedDependents {
		allPkgs.Add(pkg)
	}
	for pkg := range walkedDependentsDependencies {
		allPkgs.Add(pkg)
	}
	return &SelectedPackages{
		pkgs:          allPkgs,
		unusedFilters: unmatchedSelectors,
	}, nil
}

func matchPackageNamesToVertices(pattern string, vertices []dag.Vertex) (util.Set, error) {
	packages := make(util.Set)
	for _, v := range vertices {
		packages.Add(v)
	}
	return matchPackageNames(pattern, packages)
}

func matchPackageNames(pattern string, packages util.Set) (util.Set, error) {
	matcher, err := matcherFromPattern(pattern)
	if err != nil {
		return nil, err
	}
	matched := make(util.Set)
	for _, pkg := range packages {
		pkg := pkg.(string)
		if matcher(pkg) {
			matched.Add(pkg)
		}
	}
	if matched.Len() == 0 && !strings.HasPrefix(pattern, "@") && !strings.Contains(pattern, "/") {
		// we got no matches and the pattern isn't a scoped package.
		// Check if we have exactly one scoped package that does match
		scopedPattern := fmt.Sprintf("@*/%v", pattern)
		matcher, err = matcherFromPattern(scopedPattern)
		if err != nil {
			return nil, err
		}
		foundScopedPkg := false
		for _, pkg := range packages {
			pkg := pkg.(string)
			if matcher(pkg) {
				if foundScopedPkg {
					// we found a second scoped package. Return the empty set, we can't
					// disambiguate
					return make(util.Set), nil
				}
				foundScopedPkg = true
				matched.Add(pkg)
			}
		}
	}
	return matched, nil
}

func GetChangedPackages(changedFiles []string, packageInfos map[interface{}]*fs.PackageJSON) util.Set {
	changedPackages := make(util.Set)
	for k, pkgInfo := range packageInfos {
		partialPath := pkgInfo.Dir
		if someFileHasPrefix(partialPath, changedFiles) {
			changedPackages.Add(k)
		}
	}
	return changedPackages
}

func someFileHasPrefix(prefix string, files []string) bool {
	for _, f := range files {
		if strings.HasPrefix(f, prefix) {
			return true
		}
	}
	return false
}
