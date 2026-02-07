const path = require('path')
const kebabCase = require('lodash.kebabcase')
const sharp = require('sharp')

sharp.simd(false)
sharp.cache(false)

const postNodes = []

// Avoid N+1 thumbnail lookups.
//
// `MarkdownRemark.thumbnail` is queried for lists (index/tag/category pages). If
// we do a `nodeModel.findOne()` per Markdown node, we end up with an N+1 query
// pattern against the datastore.
//
// Strategy:
// - Cache per-Markdown id so repeated appearances across pages don't re-query.
// - Batch loads per GraphQL request using `nodeModel.findAll({ absolutePath: { in: [...] } })`.
//
// Cache stores `File` node ids (or null) so we can re-fetch via
// `nodeModel.getNodeById()` on each page and still correctly track page
// dependencies.
const thumbnailIdByMarkdownId = new Map()
const thumbnailFileLoaderByNodeModel = new WeakMap()

function createThumbnailFileLoader(nodeModel) {
  /** @type {Map<string, Promise<any>>} */
  const cache = new Map()
  /** @type {Map<string, { resolve: (v: any) => void, reject: (e: any) => void }>} */
  let queue = new Map()
  let scheduled = false

  const flush = async () => {
    scheduled = false

    const batch = queue
    queue = new Map()

    const absolutePaths = Array.from(batch.keys())
    if (absolutePaths.length === 0) return

    try {
      const { entries } = await nodeModel.findAll({
        type: 'File',
        query: {
          filter: {
            absolutePath: {
              in: absolutePaths,
            },
          },
          // Not required, but makes the intent explicit.
          limit: absolutePaths.length,
        },
      })

      const fileNodes = Array.from(entries)
      const fileNodeByAbsolutePath = new Map(fileNodes.map(node => [node.absolutePath, node]))

      for (const absolutePath of absolutePaths) {
        batch.get(absolutePath).resolve(fileNodeByAbsolutePath.get(absolutePath) ?? null)
      }
    } catch (error) {
      for (const { reject } of batch.values()) {
        reject(error)
      }
    }
  }

  const scheduleFlush = () => {
    if (scheduled) return
    scheduled = true
    // Batch within the same event loop turn.
    process.nextTick(flush)
  }

  return {
    load(absolutePath) {
      if (cache.has(absolutePath)) return cache.get(absolutePath)

      const promise = new Promise((resolve, reject) => {
        queue.set(absolutePath, { resolve, reject })
        scheduleFlush()
      })

      cache.set(absolutePath, promise)
      return promise
    },
  }
}

function getThumbnailFileLoader(nodeModel) {
  if (thumbnailFileLoaderByNodeModel.has(nodeModel)) {
    return thumbnailFileLoaderByNodeModel.get(nodeModel)
  }

  const loader = createThumbnailFileLoader(nodeModel)
  thumbnailFileLoaderByNodeModel.set(nodeModel, loader)
  return loader
}

function resolveThumbnailAbsolutePath({ postFileAbsolutePath, frontmatterThumbnail }) {
  const siblingDir = path.dirname(postFileAbsolutePath)

  const preferred =
    typeof frontmatterThumbnail === 'string' && frontmatterThumbnail.trim() !== ''
      ? frontmatterThumbnail.trim()
      : 'thumbnail.svg'

  return path.resolve(siblingDir, preferred)
}

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

    // Posts live under `posts/YYYY/YYYY-MM-DD-slug/index.md`.
    // Derive stable identifiers once here so templates/components don't need to
    // repeatedly parse `fileAbsolutePath`.
    if (Object.prototype.hasOwnProperty.call(node, 'fileAbsolutePath')) {
      const postFolder = node.fileAbsolutePath.split('/').slice(-2)[0]
      const match = /^(\d{4}-\d{2}-\d{2})-(.+)$/.exec(postFolder)

      if (match) {
        const [, date, postId] = match
        slug = `/${postId}/`

        createNodeField({ node, name: 'date', value: date })
        createNodeField({ node, name: 'postId', value: postId })
      }
    }

    createNodeField({ node, name: 'slug', value: slug })
    postNodes.push(node)
  }
}

// Code-driven default thumbnail.
//
// Query this as `markdownRemark { thumbnail { ... } }`.
//
// Behavior:
// - If `frontmatter.thumbnail` exists, it is used as the filename (relative to the post folder).
// - Otherwise, Gatsby will try `thumbnail.svg` in the same folder as `index.md`.
// - If the file doesn't exist, `thumbnail` resolves to null (matching current behavior).
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    MarkdownRemark: {
      thumbnail: {
        type: 'File',
        resolve: (source, _args, context) => {
          if (thumbnailIdByMarkdownId.has(source.id)) {
            const cached = thumbnailIdByMarkdownId.get(source.id)

            // `cached` can be a value (string/null) or an in-flight Promise.
            if (cached && typeof cached.then !== 'function') {
              return context.nodeModel.getNodeById({ id: cached, type: 'File' })
            }

            if (cached === null) return null

            return cached.then(id => (id ? context.nodeModel.getNodeById({ id, type: 'File' }) : null))
          }

          // Store the in-flight promise immediately to dedupe concurrent resolver calls.
          const promise = (async () => {
            // `MarkdownRemark` nodes already expose `fileAbsolutePath`.
            // Use it to avoid an extra `getNodeById()` per node.
            const postFileAbsolutePath =
              source.fileAbsolutePath ?? context.nodeModel.getNodeById({ id: source.parent })?.absolutePath

            if (!postFileAbsolutePath) return null

            const absolutePath = resolveThumbnailAbsolutePath({
              postFileAbsolutePath,
              frontmatterThumbnail: source.frontmatter?.thumbnail,
            })

            const loader = getThumbnailFileLoader(context.nodeModel)
            const fileNode = await loader.load(absolutePath)
            return fileNode?.id ?? null
          })()

          // Cache the in-flight promise, then replace it with the resolved id for
          // faster subsequent lookups. If the thumbnail doesn't exist (null),
          // don't cache that permanently so it can appear later during develop.
          thumbnailIdByMarkdownId.set(source.id, promise)
          promise
            .then(id => {
              if (id) thumbnailIdByMarkdownId.set(source.id, id)
              else thumbnailIdByMarkdownId.delete(source.id)
            })
            .catch(() => {
              thumbnailIdByMarkdownId.delete(source.id)
            })

          return promise.then(id => (id ? context.nodeModel.getNodeById({ id, type: 'File' }) : null))
        },
      },
    },
  })
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
            allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/\\/posts\\//"}}) {
              edges {
                node {
                  fileAbsolutePath
                  fields {
                    slug
                  }
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

          const postFolder = edge.node.fileAbsolutePath.split('/').slice(-2)[0]
          const postId = postFolder.substring(11)

          createPage({
            path: postId,
            component: postPage,
            context: {
              // Avoid `regex` filters for per-post queries; they're slow on the datastore.
              postId,
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
