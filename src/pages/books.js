import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { Headings, P, StyledAnchor } from "../components/page-elements"
import { Link, graphql } from "gatsby"
import Tilt from "react-tilt"

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin-top: ${({ theme }) => theme.spacing["10"]};

  ${({ theme }) =>
    theme.mobileLandscape`
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: ${({ theme }) => theme.spacing["10"]};
  `};
`

const BookDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const BookTitle = styled(Headings.H4)`
  font-family: ${({ theme }) => theme.font.serif};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 0;
`

const BookAuthor = styled.div`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const PageDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: middle;
`

const BookTilt = styled(Tilt)`
  display: flex;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: ${({ theme }) => theme.spacing["2"]};
`

const Book = ({ title, authors, cover, path }) => (
  <BookDiv>
    <Link to={path}>
      <BookTilt options={{ scale: 1.05 }}>
        <img src={cover} />
      </BookTilt>
    </Link>
    <BookTitle>{title}</BookTitle>
    <BookAuthor>{authors}</BookAuthor>
  </BookDiv>
)

export default ({ data }) => {
  const edges = data.allMdx ? data.allMdx.edges : []

  return (
    <Layout>
      <PageDesc>
        <Headings.SerifH1>Books</Headings.SerifH1>
        <P>
          Here are some of the books that I've read recently and my thoughts on
          them. <br />I also keep a list of books I look forward to reading,
          which you can find <StyledAnchor>here</StyledAnchor>.
        </P>
      </PageDesc>
      {edges.length === 0 ? (
        <P>There are no books here</P>
      ) : (
        <BookGrid>
          {edges.map(({ node }, index) => {
            const title = node.frontmatter.title
            const authors = node.frontmatter.authors
            const coverImageUrl = node.fields.coverImage
            const path = `${node.fields.collection}${node.fields.slug}`

            return (
              <Book
                key={index}
                title={title}
                authors={authors}
                cover={coverImageUrl}
                path={path}
              />
            )
          })}
        </BookGrid>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(
      filter: {
        frontmatter: { is_hidden: { ne: true } }
        fields: { collection: { eq: "books" } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            authors
          }
          fields {
            slug
            collection
            coverImage
          }
        }
      }
    }
  }
`
