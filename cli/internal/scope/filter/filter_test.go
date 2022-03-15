package filter

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/pyr-sh/dag"
	"github.com/vercel/turborepo/cli/internal/fs"
	"github.com/vercel/turborepo/cli/internal/util"
)

type mockSCM struct {
	changed []string
}

func (m *mockSCM) ChangedFiles(fromCommit string, includeUntracked bool, relativeTo string) []string {
	changed := []string{}
	for _, change := range m.changed {
		if strings.HasPrefix(change, relativeTo) {
			changed = append(changed, change)
		}
	}
	return changed
}

func setMatches(t *testing.T, name string, s util.Set, expected []string) {
	expectedSet := make(util.Set)
	for _, item := range expected {
		expectedSet.Add(item)
	}
	missing := s.Difference(expectedSet)
	if missing.Len() > 0 {
		t.Errorf("%v set has extra elements: %v", name, strings.Join(missing.UnsafeListOfStrings(), ", "))
	}
	extra := expectedSet.Difference(s)
	if extra.Len() > 0 {
		t.Errorf("%v set missing elements: %v", name, strings.Join(extra.UnsafeListOfStrings(), ", "))
	}
}

func Test_filter(t *testing.T) {
	root, err := os.Getwd()
	if err != nil {
		t.Fatalf("failed to get working directory: %v", err)
	}
	scm := &mockSCM{}
	packageJSONs := make(map[interface{}]*fs.PackageJSON)
	graph := &dag.AcyclicGraph{}
	graph.Add("project-0")
	packageJSONs["project-0"] = &fs.PackageJSON{
		Name: "project-0",
		Dir:  filepath.Join(root, "packages", "project-0"),
	}
	graph.Add("project-1")
	packageJSONs["project-1"] = &fs.PackageJSON{
		Name: "project-1",
		Dir:  filepath.Join(root, "packages", "project-1"),
	}
	graph.Add("project-2")
	packageJSONs["project-2"] = &fs.PackageJSON{
		Name: "project-2",
		Dir:  filepath.Join(root, "project-2"),
	}
	graph.Add("project-3")
	packageJSONs["project-3"] = &fs.PackageJSON{
		Name: "project-3",
		Dir:  filepath.Join(root, "project-3"),
	}
	graph.Add("project-4")
	packageJSONs["project-4"] = &fs.PackageJSON{
		Name: "project-4",
		Dir:  filepath.Join(root, "project-4"),
	}
	graph.Add("project-5")
	packageJSONs["project-5"] = &fs.PackageJSON{
		Name: "project-5",
		Dir:  filepath.Join(root, "project-5"),
	}
	// Note: inside project-5
	graph.Add("project-6")
	packageJSONs["project-6"] = &fs.PackageJSON{
		Name: "project-6",
		Dir:  filepath.Join(root, "project-5", "packages", "project-6"),
	}
	// Add dependencies
	graph.Connect(dag.BasicEdge("project-0", "project-1"))
	graph.Connect(dag.BasicEdge("project-0", "project-5"))
	graph.Connect(dag.BasicEdge("project-1", "project-2"))
	graph.Connect(dag.BasicEdge("project-1", "project-4"))

	r := &Resolver{
		Graph:        graph,
		PackageInfos: packageJSONs,
		Cwd:          root,
		SCM:          scm,
	}

	testCases := []struct {
		Name      string
		Selectors []*TargetSelector
		Expected  []string
	}{
		{
			"select only package dependencies (excluding the package itself)",
			[]*TargetSelector{
				{
					excludeSelf:         true,
					includeDependencies: true,
					namePattern:         "project-1",
				},
			},
			[]string{"project-2", "project-4"},
		},
		{
			"select package with dependencies",
			[]*TargetSelector{
				{
					excludeSelf:         false,
					includeDependencies: true,
					namePattern:         "project-1",
				},
			},
			[]string{"project-1", "project-2", "project-4"},
		},
		{
			"select package with dependencies and dependents, including dependent dependencies",
			[]*TargetSelector{
				{
					excludeSelf:         true,
					includeDependencies: true,
					includeDependents:   true,
					namePattern:         "project-1",
				},
			},
			[]string{"project-0", "project-1", "project-2", "project-4", "project-5"},
		},
		{
			"select package with dependents",
			[]*TargetSelector{
				{
					includeDependents: true,
					namePattern:       "project-2",
				},
			},
			[]string{"project-1", "project-2", "project-0"},
		},
		{
			"select dependents excluding package itself",
			[]*TargetSelector{
				{
					excludeSelf:       true,
					includeDependents: true,
					namePattern:       "project-2",
				},
			},
			[]string{"project-0", "project-1"},
		},
		{
			"filter using two selectors: one selects dependencies another selects dependents",
			[]*TargetSelector{
				{
					excludeSelf:       true,
					includeDependents: true,
					namePattern:       "project-2",
				},
				{
					excludeSelf:         true,
					includeDependencies: true,
					namePattern:         "project-1",
				},
			},
			[]string{"project-0", "project-1", "project-2", "project-4"},
		},
		{
			"select just a package by name",
			[]*TargetSelector{
				{
					namePattern: "project-2",
				},
			},
			[]string{"project-2"},
		},
		// Note: we don't support the option to switch path prefix mode
		// {
		// 	"select by parentDir",
		// 	[]*TargetSelector{
		// 		{
		// 			parentDir: "/packages",
		// 		},
		// 	},
		// 	[]string{"project-0", "project-1"},
		// },
		{
			"select by parentDir using glob",
			[]*TargetSelector{
				{
					parentDir: "/packages/*",
				},
			},
			[]string{"project-0", "project-1"},
		},
		{
			"select by parentDir using globstar",
			[]*TargetSelector{
				{
					parentDir: "/project-5/**",
				},
			},
			[]string{"project-5", "project-6"},
		},
		{
			"select by parentDir with no glob",
			[]*TargetSelector{
				{
					parentDir: "/project-5",
				},
			},
			[]string{"project-5"},
		},
		{
			"select all packages except one",
			[]*TargetSelector{
				{
					exclude:     true,
					namePattern: "project-1",
				},
			},
			[]string{"project-0", "project-2", "project-3", "project-4", "project-5", "project-6"},
		},
	}

	for _, tc := range testCases {
		pkgs, err := r.GetFilteredPackages(tc.Selectors)
		if err != nil {
			t.Fatalf("%v failed to filter packages: %v", tc.Name, err)
		}
		setMatches(t, tc.Name, pkgs.pkgs, tc.Expected)
	}

	pkgs, err := r.GetFilteredPackages([]*TargetSelector{
		{
			excludeSelf:         true,
			includeDependencies: true,
			namePattern:         "project-7",
		},
	})
	if err != nil {
		t.Fatalf("unmatched filter failed to filter packages: %v", err)
	}
	if pkgs.pkgs.Len() != 0 {
		t.Errorf("unmatched filter expected no packages, got %v", strings.Join(pkgs.pkgs.UnsafeListOfStrings(), ", "))
	}
	if len(pkgs.unusedFilters) != 1 {
		t.Errorf("unmatched filter expected to report one unused filter, got %v", len(pkgs.unusedFilters))
	}
}

func Test_matchScopedPackage(t *testing.T) {
	root, err := os.Getwd()
	if err != nil {
		t.Fatalf("failed to get working directory: %v", err)
	}
	scm := &mockSCM{}
	packageJSONs := make(map[interface{}]*fs.PackageJSON)
	graph := &dag.AcyclicGraph{}
	graph.Add("@foo/bar")
	packageJSONs["@foo/bar"] = &fs.PackageJSON{
		Name: "@foo/bar",
		Dir:  filepath.Join(root, "packages", "bar"),
	}
	r := &Resolver{
		Graph:        graph,
		PackageInfos: packageJSONs,
		Cwd:          root,
		SCM:          scm,
	}
	pkgs, err := r.GetFilteredPackages([]*TargetSelector{
		{
			namePattern: "bar",
		},
	})
	if err != nil {
		t.Fatalf("failed to filter packages: %v", err)
	}
	setMatches(t, "match scoped package", pkgs.pkgs, []string{"@foo/bar"})
}

func Test_matchExactPackages(t *testing.T) {
	root, err := os.Getwd()
	if err != nil {
		t.Fatalf("failed to get working directory: %v", err)
	}
	scm := &mockSCM{}
	packageJSONs := make(map[interface{}]*fs.PackageJSON)
	graph := &dag.AcyclicGraph{}
	graph.Add("@foo/bar")
	packageJSONs["@foo/bar"] = &fs.PackageJSON{
		Name: "@foo/bar",
		Dir:  filepath.Join(root, "packages", "@foo", "bar"),
	}
	graph.Add("bar")
	packageJSONs["bar"] = &fs.PackageJSON{
		Name: "bar",
		Dir:  filepath.Join(root, "packages", "bar"),
	}
	r := &Resolver{
		Graph:        graph,
		PackageInfos: packageJSONs,
		Cwd:          root,
		SCM:          scm,
	}
	pkgs, err := r.GetFilteredPackages([]*TargetSelector{
		{
			namePattern: "bar",
		},
	})
	if err != nil {
		t.Fatalf("failed to filter packages: %v", err)
	}
	setMatches(t, "match exact package", pkgs.pkgs, []string{"bar"})
}

func Test_matchMultipleScopedPackages(t *testing.T) {
	root, err := os.Getwd()
	if err != nil {
		t.Fatalf("failed to get working directory: %v", err)
	}
	scm := &mockSCM{}
	packageJSONs := make(map[interface{}]*fs.PackageJSON)
	graph := &dag.AcyclicGraph{}
	graph.Add("@foo/bar")
	packageJSONs["@foo/bar"] = &fs.PackageJSON{
		Name: "@foo/bar",
		Dir:  filepath.Join(root, "packages", "@foo", "bar"),
	}
	graph.Add("@types/bar")
	packageJSONs["@types/bar"] = &fs.PackageJSON{
		Name: "@types/bar",
		Dir:  filepath.Join(root, "packages", "@types", "bar"),
	}
	r := &Resolver{
		Graph:        graph,
		PackageInfos: packageJSONs,
		Cwd:          root,
		SCM:          scm,
	}
	pkgs, err := r.GetFilteredPackages([]*TargetSelector{
		{
			namePattern: "bar",
		},
	})
	if err != nil {
		t.Fatalf("failed to filter packages: %v", err)
	}
	setMatches(t, "match nothing with multiple scoped packages", pkgs.pkgs, []string{})
}
