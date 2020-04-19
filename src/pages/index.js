import React, { Component } from 'react'
import Helmet from 'react-helmet'
import GitHubButton from 'react-github-btn'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import avatar from '../images/avatar.png'

export default class Index extends Component {
  state = {
    searchTerm: '',
    posts: this.props.data.posts.edges,
    filteredPosts: this.props.data.posts.edges,
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value }, () => this.filterPosts())
  }

  filterPosts = () => {
    const { posts, searchTerm } = this.state

    const filteredPosts = posts.filter(post =>
      post.node.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    this.setState({ filteredPosts })
  }

  render() {
    const { data } = this.props

    const { filteredPosts, searchTerm } = this.state
    const filterCount = filteredPosts.length
    const categories = this.props.data.categories.group

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Full Stack Software Developer`} />
        <SEO />
        <div className="container">
          <div className="lead">
            <div className="avatar-section">
              <img src={avatar} className="avatar-image" alt="Calvin" />
            </div>

            <div className="elevator">
              <h1>Hi, I'm Calvin 👋</h1>
              <p>DevOps Engineer passionate about IT as a career and a hobby!</p>
              <div className="profile-buttons">
                <GitHubButton
                  href="https://github.com/calvinbui"
                  data-size="large"
                  data-show-count="false"
                >calvinbui</GitHubButton>
              </div>
            </div>
          </div>
        </div>

        <div className="container front-page">
          <div className="container">
            <div className="category-container">
              {categories.map(category => {
                return (
                  <Link
                    to={`/categories/${category.fieldValue.toLowerCase()}`}
                    className="category-filter"
                    key={category.fieldValue}
                  >
                    {category.fieldValue}
                  </Link>
                )
              })}
            </div>
            <div className="search-container">
              <input
                className="search"
                type="text"
                name="searchTerm"
                value={searchTerm}
                placeholder="Type here to filter posts..."
                onChange={this.handleChange}
              />
              <div className="filter-count">{filterCount}</div>
            </div>
            <PostListing postEdges={filteredPosts} />
          </div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt(pruneLength: 180)
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 50, height: 50) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    categories: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
