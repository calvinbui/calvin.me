import React, { Component } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { formatDate } from '../utils/global'

const config = require('../../data/SiteConfig')

export default class PostListing extends Component {
  getPostList() {
    const { postEdges } = this.props
    const pathPrefix = config.pathPrefix === '' ? '/' : config.pathPrefix
    const postList = postEdges.map(postEdge => (
      {
        path: pathPrefix + postEdge.node.fileAbsolutePath.split('/').slice(-2)[0].substr(11),
        tags: postEdge.node.frontmatter.tags,
        thumbnail: postEdge.node.frontmatter.thumbnail,
        title: postEdge.node.frontmatter.title,
        date: formatDate(postEdge.node.fileAbsolutePath.split('/').slice(-2)[0].substr(0, 10)),
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        categories: postEdge.node.frontmatter.categories,
      }
    ))
    return postList
  }

  render() {
    const postList = this.getPostList()

    return (
      <section className="posts">
        {postList.map(post => {
          let thumbnail
          if (post.thumbnail) {
            if (post.thumbnail.childImageSharp) {
              thumbnail = <GatsbyImage image={post.thumbnail.childImageSharp.gatsbyImageData} />
            } else {
              thumbnail = <div className="gatsby-image-wrapper"><img src={post.thumbnail.publicURL} /></div>
            }
          } else {
            thumbnail = <div />
          }

          return (
            <Link to={post.path} key={post.title}>
              <div className="each">
                {thumbnail}
                <div className="each-list-item">
                  <h2>{post.title}</h2>
                  <div className="datetime">{post.date}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    )
  }
}
