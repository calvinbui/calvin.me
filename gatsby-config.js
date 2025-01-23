const urljoin = require('url-join')
const config = require('./data/SiteConfig')

module.exports = {
  pathPrefix: config.pathPrefix === '' ? '/' : config.pathPrefix,
  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(config.siteUrl, config.pathPrefix)}/favicon/favicon-48.png`,
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'posts',
        path: `${__dirname}/posts/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 850,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [],
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              maintainCase: false,
              removeAccents: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: config.themeColor,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false
      }
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/sitemap',
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: '/favicon/favicon-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/favicon/favicon-1024.png',
            sizes: '1024x1024',
            type: 'image/png',
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata
          ret.allMarkdownRemark = ref.query.allMarkdownRemark
          ret.generator = 'Calvin Bui'
          return ret
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.fileAbsolutePath.split('/').slice(-2)[0].substring(0, 10),
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                url: rssMetadata.site_url + edge.node.fileAbsolutePath.split('/').slice(-2)[0].substring(11),
                guid: rssMetadata.site_url + edge.node.fileAbsolutePath.split('/').slice(-2)[0].substring(11),
                custom_elements: [
                  { 'content:encoded': edge.node.html },
                  { author: config.userName },
                ],
              }))
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { fields: [fileAbsolutePath], order: DESC }
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 180)
                    html
                    timeToRead
                    fileAbsolutePath
                    frontmatter {
                      title
                      categories
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss,
            title: 'Calvin Bui - RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-umami`,
      options: {
        websiteId: '90b1fd6b-e6ea-4725-848e-213b6cc123d2',
        srcUrl: 'https://u.calvin.me/dW1hbWk=.js',
        includeInDevelopment: false,
        autoTrack: true,
        respectDoNotTrack: false,
      },
    },
    {
      resolve: "gatsby-plugin-page-progress",
      options: {
        includePaths: [{ regex: "^/.*" }],
        excludePaths: ["/", "/tags", "/categories", { regex: "^/categories/.*" }, { regex: "^/tags/.*" }],
        height: 3,
        prependToBody: false,
        color: `#cc3333`,
        footerHeight: 100,
        headerHeight: 0,
      },
    },
  ],
}
