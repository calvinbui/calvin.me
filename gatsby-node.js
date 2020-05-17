const path = require('path')
const kebabCase = require('lodash.kebabcase')
const sharp = require('sharp')

sharp.simd(false)
sharp.cache(false)

const postNodes = []

function addSiblingNodes(createNodeField) {
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
      value: nextNode.fileAbsolutePath.split('/').slice(-2)[0].substr(11),
    })

    createNodeField({
      node: currNode,
      name: 'prevTitle',
      value: prevNode.frontmatter.title,
    })

    createNodeField({
      node: currNode,
      name: 'prevSlug',
      value: prevNode.fileAbsolutePath.split('/').slice(-2)[0].substr(11),
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
      if (Object.prototype.hasOwnProperty.call(node, 'fileAbsolutePath'))
        slug = `/${node.fileAbsolutePath.split('/').slice(-2)[0].substr(11)}/`
      if (Object.prototype.hasOwnProperty.call(node, 'fileAbsolutePath')) {
        const date = new Date(node.fileAbsolutePath.split('/').slice(-2)[0].substr(0, 10))

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
    const tagPage = path.resolve('src/templates/tag.js')
    const categoryPage = path.resolve('src/templates/category.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  fileAbsolutePath
                  frontmatter {
                    tags
                    categories
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          // eslint-disable-next-line no-console
          console.log(result.errors)
          reject(result.errors)
        }

        const tagSet = new Set()
        const categorySet = new Set()

        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag)
            })
          }

          if (edge.node.frontmatter.categories) {
            edge.node.frontmatter.categories.forEach(category => {
              categorySet.add(category)
            })
          }

          createPage({
            path: edge.node.fileAbsolutePath.split('/').slice(-2)[0].substring(11),
            component: postPage,
            context: {
              filter: `/^.*\\/\\d{4}-\\d{2}-\\d{2}-${edge.node.fileAbsolutePath.split('/').slice(-2)[0].substring(11)}\\/.*$/`,
            },
          })
        })

        const tagList = Array.from(tagSet)
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag,
            },
          })
        })

        const categoryList = Array.from(categorySet)
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${category.toLowerCase()}/`,
            component: categoryPage,
            context: {
              category,
            },
          })
        })
      })
    )
  })
}
