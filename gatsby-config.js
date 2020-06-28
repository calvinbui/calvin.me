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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        // https://www.gatsbyjs.org/docs/caching/
        headers: {
          '/**/*.html': [
            'cache-control: public',
            'cache-control: max-age=0',
            'cache-control: must-revalidate'
          ],
          '/page-data/*.json': [
            'cache-control: public',
            'cache-control: max-age=0',
            'cache-control: must-revalidate'
          ],
          '/app-data.json': [
            'cache-control: public',
            'cache-control: max-age=0',
            'cache-control: must-revalidate'
          ],
          '/static/*': [
            'cache-control: public',
            'cache-control: max-age=31536000',
            'cache-control: immutable'
          ],
          '/**/*.js': [
            'cache-control: public',
            'cache-control: max-age=31536000',
            'cache-control: immutable'
          ],
          '/**/*.css': [
            'cache-control: public',
            'cache-control: max-age=31536000',
            'cache-control: immutable'
          ],
          '/sw.js': [
            'cache-control: public',
            'cache-control: max-age=0',
            'cache-control: must-revalidate'
          ],
        },
      },
    },
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 850,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              maintainCase: false,
              removeAccents: true,
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
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
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
                  { author: config.userEmail },
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
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://mtmo.bui.services',
        matomoPhpScript: 'p.php',
        matomoJsScript: 'p.js',
        siteUrl: urljoin(config.siteUrl, config.pathPrefix),
        dev: false,
      }
    },
  ],
}
