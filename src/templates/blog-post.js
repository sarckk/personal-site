import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/layout"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { ExtraDetails, HR } from "../components/page-elements"
import MDX from "mdx-scoped-runtime"
import styled from "styled-components"
import {
  CMS_WRAPPER,
  CMS_SHORTCODES,
  CMS_COMPONENTS,
} from "../cms/cms-components"
import { ConditionalWrapper } from "../components/shared/conditional-wrapper"
import { Content } from "../components/layouts/layout"
import SEO from "../components/seo"

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing["1"]};

  ${({ theme }) => theme.tabletPortrait`
    flex-direction: row;
    margin-bottom: ${({ theme }) => theme.spacing["8"]};
    align-items: center;
  `};
`

const TextDetails = styled.div`
  flex: 1 1 50%;
  padding: 0 ${({ theme }) => theme.spacing["3"]};
  margin-top: ${({ theme }) => theme.spacing["6"]};

  ${({ theme }) => theme.tabletPortrait`
    margin-top:0;
  `};
`

const PostImage = styled.div`
  flex: 1 0 50%;
  padding: 0 ${({ theme }) => theme.spacing["3"]};

  ${({ theme }) => theme.tabletPortrait`
    padding: 0;
    padding-right: ${({ theme }) => theme.spacing["3"]};
  `};
`

const Title = styled.h2`
  margin-top: 0;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  letter-spacing: ${({ theme }) => theme.lineHeight.tight};
  line-height: ${({ theme }) => theme.lineHeight.none};
  margin-bottom: ${({ theme }) => theme.spacing["6"]};

  ${({ theme }) => theme.tabletLandscape`
    font-size: ${({ theme }) => theme.fontSize["4xl"]}; 
  `};
`

const Description = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: ${({ theme }) => theme.spacing["3"]};
  font-size: ${({ theme }) => theme.fontSize.base};

  ${({ theme }) => theme.tabletLandscape`
  font-size: ${({ theme }) => theme.fontSize.lg};
  `};
`

const MarginExtraDetails = styled(ExtraDetails)`
  margin-top: ${({ theme }) => theme.spacing["6"]};
  margin-bottom: ${({ theme }) => theme.spacing["10"]};
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
          <PostImage>
            {isPreview ? (
              <img src={featuredImage} alt="Featured" />
            ) : (
              <Img fluid={featuredImage} />
            )}
          </PostImage>
          <TextDetails>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <MarginExtraDetails>
              <div>{date.toUpperCase()}</div>
              {!isPreview && (
                <div>
                  <span role="img" aria-label="book">
                    &#x1f4d6;
                  </span>
                  {timeToRead} MIN READ
                </div>
              )}
            </MarginExtraDetails>
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
  const featuredImageFluid =
    data.mdx.frontmatter.featuredImage.childImageSharp.fluid

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={featuredImageFluid.src}
      />
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
  query($pathName: String!) {
    mdx(fields: { pathName: { eq: $pathName } }) {
      body
      timeToRead
      frontmatter {
        date(formatString: "MMM DD, YYYY")
        title
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
