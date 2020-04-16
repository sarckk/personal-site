import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { ExtraDetails } from "../components/page-elements"
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
  height: 250px;

  :hover {
    box-shadow ${({ theme }) => theme.boxShadow.postPreviewHover};
  }
`

const PostTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
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
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const PostThumbnail = styled.div`
  flex: 1 0 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DESC_PRUNE_LENGTH = 100

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
        console.log(node.timeToRead)
        const description = node.frontmatter.description
        const truncatedDesc =
          description.length > DESC_PRUNE_LENGTH
            ? description.slice(0, DESC_PRUNE_LENGTH) + "..."
            : description
        let featuredImgFixed =
          node.frontmatter.featuredImage.childImageSharp.fixed

        return (
          <BlogPost to={node.fields.slug}>
            <PostDetails>
              <PostTitle>{node.frontmatter.title}</PostTitle>
              <ExtraDetails>
                <span style={{ marginRight: "10px" }}>
                  {node.frontmatter.date.toUpperCase()}
                </span>
                <span>{node.timeToRead} MIN READ</span>
              </ExtraDetails>
              <PostDesc>{truncatedDesc}</PostDesc>
            </PostDetails>
            <PostThumbnail>
              <Img
                fixed={featuredImgFixed}
                imgStyle={{ objectFit: "contain" }}
              />
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
                fixed(width: 250, height: 250) {
                  ...GatsbyImageSharpFixed_tracedSVG
                }
              }
            }
          }
          timeToRead
          fields {
            slug
          }
        }
      }
    }
  }
`
