require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const blogQuery = `{
  allMdx(
   filter: { 
     frontmatter: { is_hidden: { ne: true } }
     fields: { collection: { eq: "blog" } }
    }
  ){
    edges{
      node{
        objectID: id
        frontmatter{
          date(formatString: "MMM DD, YYYY")
          title
          description
        }
        fields{
          pathName
        }
      }
    }
  } 
}`

const bookReviewQuery = `{
  allMdx(
   filter: { 
     frontmatter: { is_hidden: { ne: true } }
     fields: { collection: { eq: "books" } }
    }
  ){
    edges{
      node{
        objectID: id
        frontmatter{
          title
          authors
        }
        fields{
          pathName
        }
      }
    }
  } 
}`

const queryTransform = ({ data }) =>
  data.allMdx.edges
    .map(({ node }) => node)
    .map(node => {
      const { frontmatter, fields, ...rest } = node

      return {
        ...frontmatter,
        path: fields.pathName,
        ...rest,
      }
    })

const blogQueries = [
  {
    query: blogQuery,
    transformer: queryTransform,
    settings: {
      searchableAttributes: [`title`, `description`],
    },
  },
]

const bookReviewQueries = [
  {
    query: bookReviewQuery,
    transformer: queryTransform,
    settings: {
      searchableAttributes: [`title`, `authors`],
    },
  },
]

module.exports.blogConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  indexName: "blog",
  queries: blogQueries,
}

module.exports.booksConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  indexName: "books",
  queries: bookReviewQueries,
}
