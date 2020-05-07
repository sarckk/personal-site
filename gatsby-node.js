const {
  createFilePath,
  createRemoteFileNode,
} = require("gatsby-source-filesystem")
const path = require("path")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type Mdx implements Node{
      frontmatter: Frontmatter
      coverImg: File @link(from: "coverImg___NODE")
    }

    type Frontmatter @infer{
      isbn: String
      backupImage: File @fileByRelativePath
      use_backup: Boolean
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
    const collection =
      parentNode.name === "dummy" ? "dummy" : parentNode.sourceInstanceName

    createNodeField({
      node,
      name: `collection`,
      value: collection,
    })

    const slug = createFilePath({ node, getNode, basePath: "content" })
    const pathName = `${collection}${slug}`

    createNodeField({
      node,
      name: `pathName`,
      value: pathName,
    })

    if (collection === "books") {
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
              pathName
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
      path: node.fields.pathName,
      component: path.resolve(
        `./src/templates/${String(node.frontmatter.templateKey)}.js`
      ),
      context: {
        pathName: node.fields.pathName,
      },
    })
  })
}
