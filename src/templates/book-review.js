import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { Headings, HR } from "../components/page-elements"
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

export const BookReviewTemplate = ({ title, authors, body, isPreview }) => {
  return (
    <ConditionalWrapper
      condition={isPreview}
      wrapper={children => <Content>{children}</Content>}
    >
      <>
        <PostDetails>
          <TextDetails>
            <Title>{title}</Title>
            <Description>{authors}</Description>
          </TextDetails>
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

  return (
    <Layout>
      <BookReviewTemplate
        title={post.frontmatter.title}
        authors={post.frontmatter.authors}
        body={post.body}
        isPreview={false}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug }, collection: { eq: "books" } }) {
      body
      frontmatter {
        title
        authors
      }
    }
  }
`
