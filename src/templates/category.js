import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

export default class CategoryTemplate extends Component {
  render() {
    const { category } = this.props.pageContext
    const postEdges = this.props.data.allMarkdownRemark.edges

    return (
      <Layout>
        <div className="container">
          <h1>{category}</h1>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    )
  }
}

export function Head({ pageContext }) {
  return (
    <>
      <SEO />
      <title>{`Posts in category "${pageContext.category}" – ${config.siteTitle}`}</title>
    </>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: {fileAbsolutePath: DESC}
      filter: {frontmatter: {categories: {in: [$category]}}}
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          fileAbsolutePath
          frontmatter {
            title
            tags
            categories
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
    }
  }
`
