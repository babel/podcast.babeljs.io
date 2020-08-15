let babel_metadata = {
  title: "The Babel Podcast",
  author: "Henry Zhu",
  description: `Henry Zhu chats with other members of the team, TC39, and the JS community about the future of JavaScript, open source, and how it's all maintained.`,
  gitOrg: "babel",
  gitRepo: "podcast.babeljs.io",
  siteUrl: "https://podcast.babeljs.io",
  social: {
    twitter: "@babeljs",
  },
  feed: {
    rss: "https://feeds.transistor.fm/the-babel-podcast",
    google:
      "https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkcy50cmFuc2lzdG9yLmZtL3RoZS1iYWJlbC1wb2RjYXN0",
    apple:
      "https://podcasts.apple.com/us/podcast/the-babel-podcast/id1470143101",
    spotify: "https://open.spotify.com/show/3TK8x8AGckeEQEtnJVZYAz",
  },
};

module.exports = {
  siteMetadata: babel_metadata,
  pathPrefix: "/",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/episodes`,
        name: "episodes",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: "20",
            },
          },
          "gatsby-remark-copy-linked-files",
          {
            resolve: require.resolve(
              "./plugins/gatsby-remark-podcast-timestamp"
            ),
          },
        ],
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
  ],
};
