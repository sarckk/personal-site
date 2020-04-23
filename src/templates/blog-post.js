import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { ExtraDetails, Headings, HR } from "../components/page-elements"
import MDX from "mdx-scoped-runtime"
import styled from "styled-components"
import {
  CMS_WRAPPER,
  CMS_SHORTCODES,
  CMS_COMPONENTS,
} from "../cms/cms-components"
import { ConditionalWrapper } from "../components/utils/conditional-wrapper"
import { Content } from "../components/layouts/layout"

const PostDetails = styled.div`
  display: flex;
`

const TextDetails = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 ${({ theme }) => theme.spacing["3"]};
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

export const BlogTemplate = ({
  title,
  description,
  date,
  timeToRead,
  featuredImage,
  body,
  isPreview,
}) => {
  return (
    <ConditionalWrapper
      condition={isPreview}
      wrapper={children => <Content>{children}</Content>}
    >
      <>
        <PostDetails>
          <TextDetails>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <MarginExtraDetails>
              <div>{date.toUpperCase()}</div>
              {!isPreview && <div>{timeToRead} MIN READ</div>}
            </MarginExtraDetails>
          </TextDetails>
          <PostImage>
            {isPreview ? (
              <img src={featuredImage} alt="Featured" />
            ) : (
              <FeatureImage fluid={featuredImage} />
            )}
          </PostImage>
        </PostDetails>
        <HR />
        {isPreview ? (
          <MDX
            components={{ ...CMS_COMPONENTS, ...CMS_WRAPPER }}
            scope={CMS_SHORTCODES}
          >
            {body}
          </MDX>
        ) : (
          <MDXProvider
            components={{
              ...CMS_SHORTCODES,
              ...CMS_COMPONENTS,
              ...CMS_WRAPPER,
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        )}
      </>
    </ConditionalWrapper>
  )
}

export default ({ data }) => {
  const post = data.mdx
  const featuredImageFluid =
    data.mdx.frontmatter.featuredImage.childImageSharp.fluid

  return (
    <Layout>
      <BlogTemplate
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        timeToRead={post.timeToRead}
        featuredImage={featuredImageFluid}
        body={post.body}
        isPreview={false}
      />
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
