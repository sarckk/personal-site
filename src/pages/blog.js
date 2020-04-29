import React, { useState } from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { ExtraDetails } from "../components/page-elements"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { Loader } from "../components/utils/loader"
import { truncate } from "../util/truncate"

const BlogPost = styled(Link)`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: stretch;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow.postPreview};
  height: 250px;
  margin: ${({ theme }) => theme.spacing["4"]} 0;

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

const WaveBG = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
`

const DESC_PRUNE_LENGTH = 100

const BlogPreviewPage = ({ location, data }) => {
  const edges = data.allMdx ? data.allMdx.edges : []

  const [postsToShow, setPostsToShow] = useState(5)
  const [allPostsShown, setAllPostsShown] = useState(
    postsToShow >= edges.length
  )

  const loadMorePosts = () => {
    console.log("Loading more posts...")
    setPostsToShow(postsToShow => postsToShow + 5)
    setAllPostsShown(postsToShow + 5 >= edges.length)
  }

  if (edges.length === 0) {
    return (
      <Layout>
        <div>There are no posts. Come back later!</div>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      {edges.slice(0, postsToShow).map(({ node }, index) => {
        const description = node.frontmatter.description
        const truncatedDesc = truncate(description, DESC_PRUNE_LENGTH)
        let featuredImgFixed =
          node.frontmatter.featuredImage.childImageSharp.fixed

        return (
          <BlogPost key={index} to={node.fields.pathName}>
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
      {!allPostsShown && <Loader onVisible={loadMorePosts} />}
      <WaveBG>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient
              id="grad1"
              gradientTransform="rotate(90)"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#eef2f3", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#8e9eab", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            fill="url(#grad1)"
            d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,176C672,181,768,235,864,229.3C960,224,1056,160,1152,138.7C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </WaveBG>
    </Layout>
  )
}

export default BlogPreviewPage

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { is_hidden: { ne: true } }
        fields: { collection: { eq: "blog" } }
      }
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
            pathName
          }
        }
      }
    }
  }
`
