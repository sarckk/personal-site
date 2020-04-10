import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import { H1, PostDate } from "../components/page-elements"
import styled from "styled-components"
import Img from "gatsby-image"

const Title = styled(H1)`
  margin-bottom: ${({ theme }) => theme.spacing["0"]};
  text-align: center;
`
const LargePostDate = styled(PostDate)`
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing["12"]};
  margin-top: ${({ theme }) => theme.spacing["0"]};
  text-align: center;
`

const FeatureImage = styled(Img)`
  box-shadow: 0 50px 100px -30px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 32px 85px -15px rgba(117, 117, 117, 0.79);
  margin-bottom: ${({ theme }) => theme.spacing["16"]};
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  max-width: 700px;
  margin: 0 auto;
  text-align: justify;
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
`

export default ({ data }) => {
  const post = data.markdownRemark
  const featuredImgFluid =
    data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid

  return (
    <Layout>
      <Title>{post.frontmatter.title}</Title>
      <LargePostDate>{post.frontmatter.date.toUpperCase()}</LargePostDate>
      <FeatureImage fluid={featuredImgFluid} />
      <Content dangerouslySetInnerHTML={{ __html: post.html }}></Content>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMM DD, YYYY")
        title
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
