import React, { Component } from 'react'
import urljoin from 'url-join'
import config from '../../data/SiteConfig'
import favicon from '../../static/favicon/favicon-256.png'

export default class SEO extends Component {
  render() {
    const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``));
    const { postNode, postPath, postSEO } = this.props
    let title
    let description
    let image = ''
    let postURL

    if (postSEO) {
      const postMeta = postNode.frontmatter
      title = postMeta.title
      description = postMeta.description ? postMeta.description : postNode.excerpt
      postURL = urljoin(config.siteUrl, replacePath(postPath))
    } else {
      title = config.siteTitle
      description = config.siteDescription
    }

    image = urljoin(config.siteUrl, config.siteLogo)
    const blogURL = urljoin(config.siteUrl, config.pathPrefix)
    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
      },
    ]

    if (postSEO) {
      schemaOrgJSONLD.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': postURL,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: blogURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
        }
      )
    }

    return (
      <>
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

        <meta property="og:url" content={postSEO ? postURL : blogURL} />
        {postSEO && <meta property="og:type" content="article" />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <link rel="icon" type="image/png" href={favicon} />
      </>
    )
  }
}
