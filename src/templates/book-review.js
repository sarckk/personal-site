import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { Headings, HR } from "../components/page-elements"
import MDX from "mdx-scoped-runtime"
import styled from "styled-components"
import { CMS_SHORTCODES, CMS_COMPONENTS } from "../cms/cms-components"
import { ConditionalWrapper } from "../components/shared/conditional-wrapper"
import { Content } from "../components/layouts/layout"
import Img from "gatsby-image"
import { ParaContentWrapper } from "../cms/cms-components"
import SEO from "../components/seo"

const BookDetails = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing["4"]};
`

const TextDetails = styled.div`
  flex: 1 1 auto;
  padding: 0 ${({ theme }) => theme.spacing["6"]};
  display: flex;
  flex-direction: column;
`

const Title = styled(Headings.H1)`
  font-family: ${({ theme }) => theme.font.serif};
  line-height: normal;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize["3xl"]};

  ${({ theme }) => theme.mobileLandscape`
    font-size: ${({ theme }) => theme.fontSize["4xl"]};
  `};

  ${({ theme }) => theme.tabletPortrait`
    font-size: ${({ theme }) => theme.fontSize["5xl"]};
  `};
`

const Authors = styled.div`
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: ${({ theme }) => theme.spacing["3"]};
  font-size: ${({ theme }) => theme.fontSize.sm};

  ${({ theme }) => theme.mobileLandscape`
    font-size: ${({ theme }) => theme.fontSize.base};
  `};

  ${({ theme }) => theme.tabletPortrait`
    font-size: ${({ theme }) => theme.fontSize.lg};
  `};
`

const BookCover = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  flex: 0 0 auto;
  display: flex;
  align-items: center;
`

const Summary = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  margin-bottom: ${({ theme }) => theme.spacing["6"]};
  font-size: ${({ theme }) => theme.fontSize.xs};

  ${({ theme }) => theme.mobileLandscape`
    font-size: ${({ theme }) => theme.fontSize.sm};
  `};

  ${({ theme }) => theme.tabletPortrait`
    font-size: ${({ theme }) => theme.fontSize.base};
  `};
`

const BookExternalLink = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: auto;
`

const RefLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: ${({ theme }) => theme.font.sans};
  color: ${({ theme }) => theme.colors.gray[800]};
  padding: 4px 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background-color: ${props =>
    props.variant === "goodreads" ? "#f8f4ec" : "#FECE85"};

  :first-child {
    margin-right: ${({ theme }) => theme.spacing["2"]};
  }

  :hover {
    background-color: ${props =>
      props.variant === "goodreads" ? "#EEEBE3" : "#FFC66F"};
  }
`

const BookReviewWrapper = styled(ParaContentWrapper)`
  > * {
    grid-column: main;
  }

  ${({ theme }) => theme.tabletPortrait`
    > * {
      grid-column: para;
    }
  `};
`

export const BookReviewTemplate = ({
  title,
  authors,
  body,
  coverImg,
  summary,
  isPreview,
}) => {
  return (
    <ConditionalWrapper
      condition={isPreview}
      wrapper={children => <Content>{children}</Content>}
    >
      <BookReviewWrapper>
        <BookDetails>
          {!isPreview && (
            <BookCover>
              <Img fixed={coverImg} />
            </BookCover>
          )}
          <TextDetails>
            <Title>{title}</Title>
            <Authors>{authors}</Authors>
            <Summary>{summary}</Summary>
            <BookExternalLink>
              <RefLink
                rel="noopener noreferrer"
                target="_blank"
                href={`https://www.goodreads.com/search?q=${title}`}
                variant="goodreads"
              >
                Goodreads
              </RefLink>
              <RefLink
                rel="noopener noreferrer"
                target="_blank"
                href={`https://www.amazon.com/s?k=${title}`}
                variant="amazon"
              >
                Amazon
              </RefLink>
            </BookExternalLink>
          </TextDetails>
        </BookDetails>
        <HR />
        {isPreview ? (
          <MDX components={{ ...CMS_COMPONENTS }} scope={CMS_SHORTCODES}>
            {body}
          </MDX>
        ) : (
          <MDXProvider
            components={{
              ...CMS_SHORTCODES,
              ...CMS_COMPONENTS,
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        )}
      </BookReviewWrapper>
    </ConditionalWrapper>
  )
}

export default ({ data }) => {
  const post = data.mdx

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.summary}
        image={post.coverImg.childImageSharp.fixed.src}
      />
      <BookReviewTemplate
        title={post.frontmatter.title}
        authors={post.frontmatter.authors}
        body={post.body}
        coverImg={post.coverImg.childImageSharp.fixed}
        summary={post.frontmatter.summary}
        isPreview={false}
      />
    </Layout>
  )
}

export const query = graphql`
  query($pathName: String!) {
    mdx(fields: { pathName: { eq: $pathName } }) {
      body
      coverImg {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      frontmatter {
        title
        authors
        summary
      }
    }
  }
`
