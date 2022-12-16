import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../layout'
import PostTags from '../components/PostTags'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import { formatDate, editOnGithub } from '../utils/global'

export default class PostTemplate extends Component {
  render() {
    const postNode = this.props.data.markdownRemark
    const post = postNode.frontmatter

    let thumbnail

    post.id = postNode.fileAbsolutePath.split('/').slice(-2)[0].substr(11)
    post.category_id = config.postDefaultCategoryID
    post.date = postNode.fileAbsolutePath.split('/').slice(-2)[0].substr(0, 10)

    if (post.thumbnail) {
      if (post.thumbnail.childImageSharp) {
        thumbnail = <GatsbyImage image={post.thumbnail.childImageSharp.gatsbyImageData} />
      } else {
        thumbnail = <div className="gatsby-image-wrapper"><img src={post.thumbnail.publicURL} alt="" /></div>
      }
    }

    const date = formatDate(post.date)
    const githubLink = editOnGithub(post)

    return (
      <Layout>
        <SEO postPath={post.id} postNode={postNode} postSEO />
        <article className="single container">
          <header className={`single-header ${!thumbnail ? 'no-thumbnail' : ''}`}>
            {thumbnail || <div />}
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
              <div className="category-container">
                {post.categories.map(category => (
                  <Link
                    to={`/categories/${category.toLowerCase()}`}
                    className="category-filter"
                    key={category}
                  >
                    {category}
                  </Link>
                ))}
              </div>

              <PostTags tags={post.tags} />
            </div>
          </header>
          <div className="post" dangerouslySetInnerHTML={{ __html: postNode.html }} />
        </article>
      </Layout>
    )
  }
}

export const Head = ({ data }) => <title>{`${data.markdownRemark.frontmatter.title} – ${config.siteTitle}`}</title>

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
            gatsbyImageData(
              layout: FIXED
              width: 150
              height: 150
              quality: 100
              placeholder: BLURRED
            )
          }
          extension
          publicURL
        }
      }
    }
  }
`
