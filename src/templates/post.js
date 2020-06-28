import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../layout'
import PostTags from '../components/PostTags'
import SEO from '../components/SEO'
import Comments from '../components/Comments'
import config from '../../data/SiteConfig'
import { formatDate, editOnGithub } from '../utils/global'

const urljoin = require('url-join')

export default class PostTemplate extends Component {
  render() {
    const postNode = this.props.data.markdownRemark
    const post = postNode.frontmatter

    let thumbnail

    post.id = postNode.fileAbsolutePath.split('/').slice(-2)[0].substr(11)
    post.category_id = config.postDefaultCategoryID
    post.date = postNode.fileAbsolutePath.split('/').slice(-2)[0].substr(0, 10)

    if (post.thumbnail) {
      thumbnail = post.thumbnail.childImageSharp.fixed
    }

    const date = formatDate(post.date)
    const githubLink = editOnGithub(post)

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} – ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={post.id} postNode={postNode} postSEO />
        <article className="single container">
          <header className={`single-header ${!thumbnail ? 'no-thumbnail' : ''}`}>
            {thumbnail && <Img fixed={post.thumbnail.childImageSharp.fixed} />}
            <div className="flex">
              <h1>{post.title}</h1>
              <div className="post-meta">
                <time className="date">{date}</time>
                /
                <a
                  className="github-link"
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit
                </a>
              </div>
              <PostTags tags={post.tags} />
            </div>
          </header>
          <div className="post" dangerouslySetInnerHTML={{ __html: postNode.html }} />
        </article>
        <Comments className="single container" />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($filter: String!) {
    markdownRemark(fileAbsolutePath: {regex: $filter}) {
      html
      timeToRead
      excerpt
      fileAbsolutePath
      frontmatter {
        title
        categories
        tags
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
