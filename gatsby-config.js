module.exports = {
  siteMetadata: {
    title: 'The Babel Podcast',
    author: 'Henry Zhu',
    description: `Henry Zhu chats with other members of the team, TC39, and the JS community about the future of JavaScript, open source, and how it's all maintained.`,
    gitOrg: 'hzoo',
    siteUrl: 'https://podcast.babeljs.io',
    social: {
      twitter: '@left_pad',
    },
    feed: {
      rss: 'https://feeds.transistor.fm/the-babel-podcast',
      google: 'https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkcy50cmFuc2lzdG9yLmZtL3RoZS1iYWJlbC1wb2RjYXN0',
      apple: 'https://podcasts.apple.com/us/podcast/the-babel-podcast/id1470143101',
      spotify: 'https://open.spotify.com/show/3TK8x8AGckeEQEtnJVZYAz',
    },
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `UA-127078332-1`,
    //   },
    // },
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Babel Podcast`,
        short_name: `The Babel Podcast`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/icon.jpg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-twitter`
  ],
}
