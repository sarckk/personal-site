import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import {
  PostDate,
  Headings,
  BlockQuote,
  PRE,
  P,
  STRONG,
  StyledAnchor,
  UL,
  OL,
  LI,
  FullWidthDiv,
  RightHandContent,
  LeftHandContent,
  MainWidthContent,
  ParaWidthContent,
  LeftCaption,
  RightCaption,
} from "../components/page-elements"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

const Title = styled(Headings.H1)`
  margin-bottom: ${({ theme }) => theme.spacing["0"]};
  text-align: center;
`

const Description = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.fontSize.xl};
  max-width: 70%;
  text-align: justify;
  grid-column: para;
  margin: 0 auto ${({ theme }) => theme.spacing["4"]};
  color: ${({ theme }) => theme.colors.gray[600]};
`

const LargePostDate = styled(PostDate)`
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing["8"]};
  text-align: center;
`

const FeatureImage = styled(Img)`
  margin-bottom: ${({ theme }) => theme.spacing["12"]};
  box-shadow: 0px 40px 85px -20px rgba(117, 117, 117, 0.5);
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  grid-auto-rows: inherit;

  > * {
    grid-column: para;
  }
`

const mdxComponentBindings = {
  h1: Headings.H1,
  h2: Headings.H2,
  h3: Headings.H3,
  h4: Headings.H4,
  h5: Headings.H5,
  h6: Headings.H6,
  p: P,
  strong: STRONG,
  a: StyledAnchor,
  ul: UL,
  ol: OL,
  li: LI,
  blockquote: BlockQuote,
  pre: PRE,
  FullWidthDiv,
  RightHandContent,
  LeftHandContent,
  MainWidthContent,
  ParaWidthContent,
  LeftCaption,
  RightCaption,
  wrapper: Content,
}

export default ({ data }) => {
  const post = data.mdx
  const featuredImgFluid =
    data.mdx.frontmatter.featuredImage.childImageSharp.fluid

  return (
    <Layout>
      <Title>{post.frontmatter.title}</Title>
      <Description>{post.frontmatter.description}</Description>
      <LargePostDate>{post.frontmatter.date.toUpperCase()}</LargePostDate>
      <FeatureImage fluid={featuredImgFluid} />
      <MDXProvider components={mdxComponentBindings}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
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
