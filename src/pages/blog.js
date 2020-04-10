import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { PostDate } from "../components/page-elements"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

const BlogPost = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow.postPreview};

  :hover {
    box-shadow ${({ theme }) => theme.boxShadow.postPreviewHover};
  }
`

const PostTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: ${({ theme }) => theme.lineHeight.tight};
`

const PostDetails = styled.div`
  padding: 2rem 5rem 2rem 3rem;
  flex: 1 1 0;
`

const PostDesc = styled.p`
  margin-top: ${({ theme }) => theme.spacing["4"]};
  font-family: ${({ theme }) => theme.font.sans};
`

const PostThumbnail = styled.div`
  flex: 1 0 0;
`

export default ({ data }) => {
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        const description = node.frontmatter.description
        const truncatedDesc =
          description.length > 40
            ? description.slice(0, 40) + "..."
            : description
        let featuredImgFluid =
          node.frontmatter.featuredImage.childImageSharp.fluid

        return (
          <BlogPost to={node.fields.slug}>
            <PostDetails>
              <PostTitle>{node.frontmatter.title}</PostTitle>
              <PostDate>{node.frontmatter.date.toUpperCase()}</PostDate>
              <PostDesc>{truncatedDesc}</PostDesc>
            </PostDetails>
            <PostThumbnail>
              <Img fluid={featuredImgFluid} />
            </PostThumbnail>
          </BlogPost>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 500, maxHeight: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
