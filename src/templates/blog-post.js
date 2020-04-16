import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { ExtraDetails, Headings, HR } from "../components/page-elements"
import styled from "styled-components"

const PostDetails = styled.div`
  display: flex;
`

const TextDetails = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding-right: ${({ theme }) => theme.spacing["3"]};
`

const PostImage = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding-right: ${({ theme }) => theme.spacing["3"]};
`

const Title = styled(Headings.H2)`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing["2"]};
`

const Description = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: ${({ theme }) => theme.spacing["3"]};
`

const MarginExtraDetails = styled(ExtraDetails)`
  margin-top: ${({ theme }) => theme.spacing["6"]};
  margin-bottom: ${({ theme }) => theme.spacing["10"]};
`

const FeatureImage = styled(Img)`
  margin-bottom: ${({ theme }) => theme.spacing["12"]};
`

export default ({ data }) => {
  const post = data.mdx
  const featuredImgFluid =
    data.mdx.frontmatter.featuredImage.childImageSharp.fluid

  return (
    <Layout>
      <PostDetails>
        <TextDetails>
          <Title>{post.frontmatter.title}</Title>
          <Description>{post.frontmatter.description}</Description>
          <MarginExtraDetails>
            <div>{post.frontmatter.date.toUpperCase()}</div>
            <div>{post.timeToRead} MIN READ</div>
          </MarginExtraDetails>
        </TextDetails>
        <PostImage>
          <FeatureImage fluid={featuredImgFluid} />
        </PostImage>
      </PostDetails>
      <HR />
      <MDXRenderer>{post.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      frontmatter {
        date(formatString: "MMM DD, YYYY")
        title
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
