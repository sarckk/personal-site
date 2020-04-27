const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")
const fetch = require("node-fetch")

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)

  if (node.internal.type === `Mdx`) {
    const parentNode = getNode(node.parent)

    createNodeField({
      node,
      name: "collection",
      value:
        parentNode.name === "dummy-content"
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
      const url = `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`

      createNodeField({
        node,
        name: `coverImage`,
        value: url
      })
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
