require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const mdxQuery = `{
  allMdx(
   filter: { frontmatter: { is_hidden: { ne: true } } }
  ){
    edges{
      node{
        objectID: id
        excerpt(pruneLength: 100)
        frontmatter{
          date(formatString: "MMM DD, YYYY")
          title
          description
        }
        fields{
          slug
        }
      }
    }
  } 
}`

const queries = [
  {
    query: mdxQuery,
    transformer: ({ data }) =>
      data.allMdx.edges
        .map(({ node }) => node)
        .map(node => {
          const { frontmatter, fields, ...rest } = node

          return {
            ...frontmatter,
            path: fields.slug,
            ...rest,
          }
        }),
  },
]

module.exports = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  indexName: process.env.ALGOLIA_INDEX_NAME,
  queries,
}
