const algoliaConfig = require("./gatsby-plugin-algolia-config.js")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Yong Hoon Shin`,
    titleTemplate: `%s | yonghoonshin.com`,
    description: `Shin's personal website & blog`,
    author: `Yong Hoon Shin`,
    url: `https://www.yonghoonshin.com`,
    image: `/favicon.png`,
    siteLanguage: `en`,
  },
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: "uoj3gty",
        },
        custom: {
          families: ["Charter"],
          urls: ["/fonts/fonts.css"],
        },
        timeout: 2000,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `books`,
        path: `${__dirname}/content/books`,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `Github`,
        fieldName: `github`,
        url: `https://api.github.com/graphql`,
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        plugins: [
          `gatsby-remark-relative-images`,
          `gatsby-remark-images`,
          `gatsby-remark-prismjs`,
        ],
        gatsbyRemarkPlugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: { sh: "bash", js: "javascript" },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`, // first time for "blog" index
      options: algoliaConfig.blogConfig,
    },
    {
      resolve: `gatsby-plugin-algolia`, // second time for "books" index
      options: algoliaConfig.booksConfig,
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Shin's Website | yonghoonshin.com`,
        short_name: `Shin's Website`,
        start_url: `/`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
  ],
}
