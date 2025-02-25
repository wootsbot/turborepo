import { useRouter } from "next/router";
import { Avatar } from "./components/Avatar";
const Logo = ({ height, ...props }) => (
  <svg
    height={height}
    viewBox="0 0 333 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M297.282 0.0221394C288.721 -0.273052 280.161 2.38367 273.076 7.99231L277.799 10.649C283.408 6.51635 290.492 4.7452 297.282 5.04039V0.0221394Z"
      fill="url(#paint0_linear)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M322.373 11.2394C316.469 5.04038 308.794 1.20289 300.529 0.317316V5.33557C307.614 6.51634 313.813 9.76344 318.831 14.7817L322.373 11.2394Z"
      fill="url(#paint1_linear)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M333 35.4451C332.705 27.7701 329.753 20.0951 324.735 13.6009L321.192 17.1432C325.325 22.7519 327.687 28.9509 327.982 35.4451H333Z"
      fill="url(#paint2_linear)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M324.735 60.8315C329.753 54.3373 332.705 46.6624 333 38.9874H327.982C327.687 45.4816 325.325 51.6806 321.192 57.2892L324.735 60.8315Z"
      fill="url(#paint3_linear)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M300.529 74.1152C308.499 73.2296 316.469 69.3921 322.373 63.1931L318.831 59.6508C313.813 64.9642 307.318 68.2113 300.529 69.0969V74.1152Z"
      fill="url(#paint4_linear)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M273.076 66.4402C280.161 72.0488 288.721 74.7055 297.282 74.4104V69.3921C290.492 69.6873 283.703 67.9161 277.799 63.7835L273.076 66.4402Z"
      fill="url(#paint5_linear)"
    />
    <path
      d="M19.0886 26.424V57H8.89658V26.424H0.524582V17.792H27.4606V26.424H19.0886ZM39.5859 17.792V39.112C39.5859 40.256 39.6206 41.4347 39.6899 42.648C39.7939 43.8267 40.0539 44.9013 40.4699 45.872C40.9206 46.8427 41.6139 47.64 42.5499 48.264C43.4859 48.8533 44.8033 49.148 46.5019 49.148C48.2006 49.148 49.5006 48.8533 50.4019 48.264C51.3379 47.64 52.0313 46.8427 52.4819 45.872C52.9326 44.9013 53.1926 43.8267 53.2619 42.648C53.3659 41.4347 53.4179 40.256 53.4179 39.112V17.792H63.5579V40.516C63.5579 46.6173 62.1539 51.072 59.3459 53.88C56.5726 56.688 52.2913 58.092 46.5019 58.092C40.7126 58.092 36.4139 56.688 33.6059 53.88C30.7979 51.072 29.3939 46.6173 29.3939 40.516V17.792H39.5859ZM79.3883 35.316H81.3123C83.3229 35.316 84.8656 34.9 85.9403 34.068C87.0149 33.236 87.5523 32.04 87.5523 30.48C87.5523 28.92 87.0149 27.724 85.9403 26.892C84.8656 26.06 83.3229 25.644 81.3123 25.644H79.3883V35.316ZM101.8 57H89.1123L79.3883 41.92V57H69.1963V17.792H85.0563C87.2403 17.792 89.1469 18.1213 90.7763 18.78C92.4056 19.404 93.7403 20.2707 94.7803 21.38C95.8549 22.4893 96.6523 23.772 97.1723 25.228C97.7269 26.684 98.0043 28.244 98.0043 29.908C98.0043 32.8893 97.2763 35.316 95.8203 37.188C94.3989 39.0253 92.2843 40.2733 89.4763 40.932L101.8 57ZM113.655 49.096H115.891C118.457 49.096 120.294 48.7667 121.403 48.108C122.513 47.4493 123.067 46.392 123.067 44.936C123.067 43.48 122.513 42.4227 121.403 41.764C120.294 41.1053 118.457 40.776 115.891 40.776H113.655V49.096ZM113.655 33.184H115.527C118.717 33.184 120.311 31.9187 120.311 29.388C120.311 26.8573 118.717 25.592 115.527 25.592H113.655V33.184ZM103.463 17.792H118.647C122.253 17.792 124.991 18.6587 126.863 20.392C128.735 22.1253 129.671 24.6213 129.671 27.88C129.671 29.856 129.307 31.5027 128.579 32.82C127.886 34.1027 126.811 35.1947 125.355 36.096C126.811 36.3733 128.042 36.8067 129.047 37.396C130.087 37.9507 130.919 38.644 131.543 39.476C132.202 40.308 132.67 41.244 132.947 42.284C133.225 43.324 133.363 44.4333 133.363 45.612C133.363 47.4493 133.034 49.0787 132.375 50.5C131.751 51.9213 130.85 53.1173 129.671 54.088C128.527 55.0587 127.123 55.7867 125.459 56.272C123.795 56.7573 121.923 57 119.843 57H103.463V17.792ZM145.455 37.396C145.455 38.956 145.749 40.3947 146.339 41.712C146.928 43.0293 147.725 44.1733 148.731 45.144C149.736 46.1147 150.897 46.8773 152.215 47.432C153.567 47.952 154.988 48.212 156.479 48.212C157.969 48.212 159.373 47.952 160.691 47.432C162.043 46.8773 163.221 46.1147 164.227 45.144C165.267 44.1733 166.081 43.0293 166.671 41.712C167.26 40.3947 167.555 38.956 167.555 37.396C167.555 35.836 167.26 34.3973 166.671 33.08C166.081 31.7627 165.267 30.6187 164.227 29.648C163.221 28.6773 162.043 27.932 160.691 27.412C159.373 26.8573 157.969 26.58 156.479 26.58C154.988 26.58 153.567 26.8573 152.215 27.412C150.897 27.932 149.736 28.6773 148.731 29.648C147.725 30.6187 146.928 31.7627 146.339 33.08C145.749 34.3973 145.455 35.836 145.455 37.396ZM134.795 37.396C134.795 34.484 135.332 31.78 136.407 29.284C137.481 26.7533 138.972 24.552 140.879 22.68C142.785 20.808 145.056 19.352 147.691 18.312C150.36 17.2373 153.289 16.7 156.479 16.7C159.633 16.7 162.545 17.2373 165.215 18.312C167.884 19.352 170.172 20.808 172.079 22.68C174.02 24.552 175.528 26.7533 176.603 29.284C177.677 31.78 178.215 34.484 178.215 37.396C178.215 40.308 177.677 43.0293 176.603 45.56C175.528 48.056 174.02 50.24 172.079 52.112C170.172 53.984 167.884 55.4573 165.215 56.532C162.545 57.572 159.633 58.092 156.479 58.092C153.289 58.092 150.36 57.572 147.691 56.532C145.056 55.4573 142.785 53.984 140.879 52.112C138.972 50.24 137.481 48.056 136.407 45.56C135.332 43.0293 134.795 40.308 134.795 37.396ZM192.245 35.316H194.169C196.179 35.316 197.722 34.9 198.797 34.068C199.871 33.236 200.409 32.04 200.409 30.48C200.409 28.92 199.871 27.724 198.797 26.892C197.722 26.06 196.179 25.644 194.169 25.644H192.245V35.316ZM214.657 57H201.969L192.245 41.92V57H182.053V17.792H197.913C200.097 17.792 202.003 18.1213 203.633 18.78C205.262 19.404 206.597 20.2707 207.637 21.38C208.711 22.4893 209.509 23.772 210.029 25.228C210.583 26.684 210.861 28.244 210.861 29.908C210.861 32.8893 210.133 35.316 208.677 37.188C207.255 39.0253 205.141 40.2733 202.333 40.932L214.657 57ZM238.628 26.424H226.512V32.976H237.952V41.608H226.512V48.368H238.628V57H216.32V17.792H238.628V26.424ZM253.568 35.784H256.948C260.692 35.784 262.564 34.1547 262.564 30.896C262.564 27.6373 260.692 26.008 256.948 26.008H253.568V35.784ZM253.568 57H243.376V17.792H259.6C264.003 17.792 267.365 18.936 269.688 21.224C272.045 23.512 273.224 26.736 273.224 30.896C273.224 35.056 272.045 38.28 269.688 40.568C267.365 42.856 264.003 44 259.6 44H253.568V57ZM284.91 37.396C284.91 38.956 285.205 40.3947 285.794 41.712C286.383 43.0293 287.181 44.1733 288.186 45.144C289.191 46.1147 290.353 46.8773 291.67 47.432C293.022 47.952 294.443 48.212 295.934 48.212C297.425 48.212 298.829 47.952 300.146 47.432C301.498 46.8773 302.677 46.1147 303.682 45.144C304.722 44.1733 305.537 43.0293 306.126 41.712C306.715 40.3947 307.01 38.956 307.01 37.396C307.01 35.836 306.715 34.3973 306.126 33.08C305.537 31.7627 304.722 30.6187 303.682 29.648C302.677 28.6773 301.498 27.932 300.146 27.412C298.829 26.8573 297.425 26.58 295.934 26.58C294.443 26.58 293.022 26.8573 291.67 27.412C290.353 27.932 289.191 28.6773 288.186 29.648C287.181 30.6187 286.383 31.7627 285.794 33.08C285.205 34.3973 284.91 35.836 284.91 37.396ZM274.25 37.396C274.25 34.484 274.787 31.78 275.862 29.284C276.937 26.7533 278.427 24.552 280.334 22.68C282.241 20.808 284.511 19.352 287.146 18.312C289.815 17.2373 292.745 16.7 295.934 16.7C299.089 16.7 302.001 17.2373 304.67 18.312C307.339 19.352 309.627 20.808 311.534 22.68C313.475 24.552 314.983 26.7533 316.058 29.284C317.133 31.78 317.67 34.484 317.67 37.396C317.67 40.308 317.133 43.0293 316.058 45.56C314.983 48.056 313.475 50.24 311.534 52.112C309.627 53.984 307.339 55.4573 304.67 56.532C302.001 57.572 299.089 58.092 295.934 58.092C292.745 58.092 289.815 57.572 287.146 56.532C284.511 55.4573 282.241 53.984 280.334 52.112C278.427 50.24 276.937 48.056 275.862 45.56C274.787 43.0293 274.25 40.308 274.25 37.396Z"
      fill="currentColor"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="303.038"
        y1={0}
        x2="303.038"
        y2="74.4325"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E90FF" />
        <stop offset={1} stopColor="#FF1E56" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="303.038"
        y1={0}
        x2="303.038"
        y2="74.4325"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E90FF" />
        <stop offset={1} stopColor="#FF1E56" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="303.038"
        y1={0}
        x2="303.038"
        y2="74.4325"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E90FF" />
        <stop offset={1} stopColor="#FF1E56" />
      </linearGradient>
      <linearGradient
        id="paint3_linear"
        x1="303.038"
        y1={0}
        x2="303.038"
        y2="74.4325"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E90FF" />
        <stop offset={1} stopColor="#FF1E56" />
      </linearGradient>
      <linearGradient
        id="paint4_linear"
        x1="303.038"
        y1={0}
        x2="303.038"
        y2="74.4325"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E90FF" />
        <stop offset={1} stopColor="#FF1E56" />
      </linearGradient>
      <linearGradient
        id="paint5_linear"
        x1="303.038"
        y1={0}
        x2="303.038"
        y2="74.4325"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1E90FF" />
        <stop offset={1} stopColor="#FF1E56" />
      </linearGradient>
    </defs>
  </svg>
);

const Vercel = ({ height = 20 }) => (
  <svg height={height} viewBox="0 0 283 64" fill="none">
    <path
      fill="currentColor"
      d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
    />
  </svg>
);

const team = {
  jaredpalmer: {
    name: "Jared Palmer",
    twitterUsername: "jaredpalmer",
    picture: "/images/people/jaredpalmer_headshot.jpeg",
  },
  gaspargarcia_: {
    name: "Gaspar Garcia",
    twitterUsername: "gaspargarcia_",
    picture: "/images/people/gaspargarcia_.jpeg",
  },
  becca__z: {
    name: "Becca Z.",
    twitterUsername: "becca__z",
    picture: "/images/people/becca__z.jpeg",
  },
  gsoltis: {
    name: "Greg Soltis",
    twitterUsername: "gsoltis",
    picture: "/images/people/gsoltis.jpeg",
  },
};

const theme = {
  github: "https://github.com/vercel/turborepo",
  docsRepositoryBase:
    "https://github.com/vercel/turborepo/blob/main/docs/pages",
  titleSuffix: " | Turborepo",
  search: true,
  unstable_stork: false,
  unstable_staticImage: true,
  floatTOC: true,
  font: false,
  enterpriseLink:
    "https://vercel.com/contact/turborepo?utm_source=turborepo.org&utm_medium=referral&utm_campaign=header-enterpriseLink", // @TODO
  projectChatLink: "https://turborepo.org/discord",
  feedbackLink: "Question? Give us feedback →",
  authors: function Authors({ authors }) {
    return (
      <div className="grid max-w-screen-md gap-4 px-6 sm:grid-cols-2 md:grid-cols-4">
        {authors.map((username) =>
          !!team[username] ? (
            <Avatar key={username} {...team[username]} />
          ) : (
            console.warning("no author found for", username) || null
          )
        )}
      </div>
    );
  },
  banner: function Banner() {
    return (
      <div className="px-6 py-2 text-sm text-center text-white bg-black dark:bg-white dark:text-black">
        <a
          href="https://vercel.com/blog/vercel-acquires-turborepo?utm_source=turbo-site&amp;utm_medium=banner&amp;utm_campaign=turbo-website"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white no-underline dark:text-black "
          title="Go to the Vercel website"
        >
          Turborepo has joined Vercel. Read More →
        </a>
      </div>
    );
  },
  logo: function LogoActual() {
    return (
      <>
        <Logo height={32} />
        <span className="sr-only">Turborepo</span>
      </>
    );
  },
  head: function Head({ title, meta, router }) {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/images/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@turborepo" />
        <meta name="twitter:creator" content="@turborepo" />
        <meta property="og:type" content="website" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={meta.description} />
        <meta
          property="og:url"
          content={`https://turborepo.org${router.asPath}`}
        />
        <meta
          property="og:image"
          content={`https://turborepo.org${meta.ogImage ?? "/og-image.png"}`}
        />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:site_name" content="Turborepo" />
      </>
    );
  },
  footerEditLink: ({ locale }) => {
    return "Edit this page on GitHub";
  },
  footerText: ({ locale }) => {
    return (
      <a
        href="https://vercel.com?utm_source=turborepo.org&utm_medium=referral&utm_campaign=header-enterpriseLink"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center font-semibold text-current no-underline"
      >
        <span className="mr-1">Powered by</span>
        <span>
          <Vercel />
        </span>
      </a>
    );
  },
};
export default theme;
