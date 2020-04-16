import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { PostDate } from "../components/page-elements"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

const BlogPost = styled(Link)`
  display: flex;
  align-items: stretch;
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
  padding: 3rem 4rem;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PostDesc = styled.p`
  margin-top: ${({ theme }) => theme.spacing["4"]};
  font-size: ${({ theme }) => theme.fontSize.lg};
`

const PostThumbnail = styled.div`
  flex: 1 0 50%;
`

export default ({ data }) => {
  console.log("Does allMdx exist: ", data.allMdx)
  const edges = data.allMdx ? data.allMdx.edges : []

  if (edges.length === 0) {
    return (
      <Layout>
        <div>There are no posts. Come back later!</div>
      </Layout>
    )
  }

  return (
    <Layout>
      {data.allMdx.edges.map(({ node }) => {
        const description = node.frontmatter.description
        const truncatedDesc =
          description.length > 100
            ? description.slice(0, 100) + "..."
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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { is_hidden: { ne: true } } }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 280) {
                  ...GatsbyImageSharpFluid_tracedSVG
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
