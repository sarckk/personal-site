import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { ExtraDetails } from "../components/page-elements"
import { graphql, Link } from "gatsby"
import { Loader } from "../components/shared/loader"
import { truncate } from "../util/truncate"
import BackgroundImage from "gatsby-background-image"
import Wave from "../images/wave.inline.svg"
import SEO from "../components/seo"

const BlogPost = styled.li`
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all 0.3s ease;
  height: 420px;
  box-shadow: ${({ theme }) => theme.boxShadow.postPreview};
  margin: 0 auto ${({ theme }) => theme.spacing["8"]} auto;

  :hover {
    box-shadow ${({ theme }) => theme.boxShadow.postPreviewHover};
  }

  ${({ theme }) => theme.tabletPortrait`
    flex: 1 0 100%;
    height: 250px;
  `};
`

const BlogLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  height: 100%;
  width: 100%;
  display: block;
`

const BlogPostContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.tabletPortrait`
    flex-direction: row;
  `};
`

const PostTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.lineHeight.none};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};

  ${({ theme }) => theme.tabletLandscape`
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  `};
`

const PostDetails = styled.div`
  padding: ${({ theme }) => theme.spacing["4"]}
    ${({ theme }) => theme.spacing["8"]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  ${({ theme }) => theme.tabletPortrait`
    padding: ${({ theme }) => theme.spacing["8"]}
      ${({ theme }) => theme.spacing["10"]};
  `};
`

const PostDesc = styled.p`
  margin-top: ${({ theme }) => theme.spacing["4"]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${({ theme }) => theme.tabletLandscape`
    font-size: ${({ theme }) => theme.fontSize.base};
  `};
`

const PostThumbnail = styled(BackgroundImage)`
  order: -1;
  flex: 0 0 60%;
  background-size: contain;

  ${({ theme }) => theme.tabletPortrait`
    order: initial;
    flex: 0 0 40%;
  `};
`

const TopWave = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
`

const BlogWrapper = styled.div`
  grid-column: full;
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.tabletPortrait`
    width: 650px;
  `};

  ${({ theme }) => theme.tabletLandscape`
    width: 770px;
  `};
`

const BlogUL = styled.ul`
  max-width: 400px;
  padding: 0 15px;
  display: block;
  flex-wrap: wrap;
  list-style: none;
  align-items: stretch;
  margin: 0 auto;

  ${({ theme }) => theme.tabletPortrait`
    display: flex;
    width: 100%;
    max-width: none;
    padding: 0;
  `};
`

const DESC_PRUNE_LENGTH = 100

const BlogPreviewPage = ({ location, data }) => {
  const edges = data.allMdx ? data.allMdx.edges : []

  const [postsToShow, setPostsToShow] = useState(5)
  const [allPostsShown, setAllPostsShown] = useState(
    postsToShow >= edges.length
  )
  const [isTabletPortrait, setIsTabletPortrait] = useState(false)

  useEffect(() => {
    if (window === undefined) {
      return
    }

    const mql = window.matchMedia("(min-width: 768px)")

    const mediaListener = media => {
      if (media.matches) {
        setIsTabletPortrait(true)
      } else {
        setIsTabletPortrait(false)
      }
    }

    mediaListener(mql)
    mql.addListener(mediaListener)

    return () => mql.removeListener(mediaListener)
  }, [])

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
      <SEO title="Blog" />
      <BlogWrapper>
        <BlogUL>
          {edges.slice(0, postsToShow).map(({ node }, index) => {
            const description = node.frontmatter.description
            const truncatedDesc = truncate(description, DESC_PRUNE_LENGTH)
            let featuredImg =
              node.frontmatter.featuredImage.childImageSharp.fluid

            return (
              <BlogPost key={index}>
                <BlogLink to={`/${node.fields.pathName}`}>
                  <BlogPostContent>
                    <PostDetails>
                      <PostTitle>{node.frontmatter.title}</PostTitle>
                      <ExtraDetails>
                        <span style={{ marginRight: "10px" }}>
                          {node.frontmatter.date.toUpperCase()}
                        </span>
                        <span>
                          <span role="img" aria-label="book">
                            &#x1f4d6;
                          </span>
                          {` `}
                          {node.timeToRead}
                          {` `}
                          MIN READ
                        </span>
                      </ExtraDetails>
                      <PostDesc>{truncatedDesc}</PostDesc>
                    </PostDetails>
                    <PostThumbnail fluid={featuredImg} />
                  </BlogPostContent>
                </BlogLink>
              </BlogPost>
            )
          })}
          {!allPostsShown && <Loader onVisible={loadMorePosts} />}
        </BlogUL>
      </BlogWrapper>
      {isTabletPortrait && (
        <TopWave>
          <Wave />
        </TopWave>
      )}
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
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_tracedSVG
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
