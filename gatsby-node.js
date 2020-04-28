const {
  createFilePath,
  createRemoteFileNode,
} = require("gatsby-source-filesystem")
const path = require("path")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const fetch = require("node-fetch")

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type Mdx implements Node{
      coverImg: File @link(from: "coverImg___NODE")
    }
    `)
}

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions
  fmImagesToRelative(node)

  if (node.internal.type === `Mdx`) {
    const parentNode = getNode(node.parent)

    createNodeField({
      node,
      name: "collection",
      value:
        parentNode.name === "dummy"
          ? "dummy"
          : parentNode.sourceInstanceName,
    })

    const slug = createFilePath({ node, getNode, basePath: "content" })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    if (parentNode.sourceInstanceName === "books") {
      const isbn = node.frontmatter.isbn
      const url = `http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`

      let fileNode = await createRemoteFileNode({
        url,
        parentNode: node.id,
        createNode,
        createNodeId,
        cache,
        store,
      })

      if (fileNode) {
        node.coverImg___NODE = fileNode.id
      }
    }
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx(filter: { frontmatter: { is_hidden: { ne: true } } }) {
        edges {
          node {
            fields {
              collection
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: `${node.fields.collection}${node.fields.slug}`,
      component: path.resolve(
        `./src/templates/${String(node.frontmatter.templateKey)}.js`
      ),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
