import React, { Component } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { formatDate } from '../utils/global'

export default class PostListing extends Component {
  getPostList() {
    const { postEdges } = this.props
    const postList = postEdges.map(postEdge => {
      return {
        path: "/" + postEdge.node.fileAbsolutePath.split('/').slice(-2)[0].substr(11),
        tags: postEdge.node.frontmatter.tags,
        thumbnail: postEdge.node.frontmatter.thumbnail,
        title: postEdge.node.frontmatter.title,
        date: formatDate(postEdge.node.fileAbsolutePath.split('/').slice(-2)[0].substr(0, 10)),
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        categories: postEdge.node.frontmatter.categories,
      }
    })
    return postList
  }

  render() {
    const postList = this.getPostList()

    return (
      <section className="posts">
        {postList.map(post => {
          let thumbnail
          if (post.thumbnail) {
            thumbnail = post.thumbnail.childImageSharp.fixed
          }

          return (
            <Link to={post.path} key={post.title}>
              <div className="each">
                {thumbnail ? <Img fixed={thumbnail} /> : <div />}
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
