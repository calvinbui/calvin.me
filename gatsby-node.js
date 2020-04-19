const path = require('path')
const kebabCase = require('lodash.kebabcase')
const moment = require('moment')
const siteConfig = require('./data/SiteConfig')
const sharp = require('sharp')
sharp.simd(false)
sharp.cache(false)

const postNodes = []

function addSiblingNodes(createNodeField) {
  postNodes.sort(({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) => {
    const dateA = moment(date1, siteConfig.dateFromFormat)
    const dateB = moment(date2, siteConfig.dateFromFormat)

    if (dateA.isBefore(dateB)) return 1
    if (dateB.isBefore(dateA)) return -1

    return 0
  })

  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0
    const prevID = i - 1 >= 0 ? i - 1 : postNodes.length - 1
    const currNode = postNodes[i]
    const nextNode = postNodes[nextID]
    const prevNode = postNodes[prevID]

    createNodeField({
      node: currNode,
      name: 'nextTitle',
      value: nextNode.frontmatter.title,
    })

    createNodeField({
      node: currNode,
      name: 'nextSlug',
      value: nextNode.fields.slug,
    })

    createNodeField({
      node: currNode,
      name: 'prevTitle',
      value: prevNode.frontmatter.title,
    })

    createNodeField({
      node: currNode,
      name: 'prevSlug',
      value: prevNode.fields.slug,
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${kebabCase(node.frontmatter.title)}/`
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
        slug = `/${node.frontmatter.slug}/`
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
        const date = new Date(node.frontmatter.date)

        createNodeField({
          node,
          name: 'date',
          value: date.toISOString(),
        })
      }
    }
    createNodeField({ node, name: 'slug', value: slug })
    postNodes.push(node)
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
  const { name } = type
  const { createNodeField } = actions
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.js')
    const pagePage = path.resolve('src/templates/page.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    template
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.template === 'post') {
            createPage({
              path: edge.node.fields.slug,
              component: postPage,
              context: {
                slug: edge.node.fields.slug,
              },
            })
          }

          if (edge.node.frontmatter.template === 'page') {
            createPage({
              path: edge.node.fields.slug,
              component: pagePage,
              context: {
                slug: edge.node.fields.slug,
              },
            })
          }
        })
      })
    )
  })
}
