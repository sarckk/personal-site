import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { Headings, P, StyledAnchor } from "../components/page-elements"
import { Link, graphql } from "gatsby"
import Tilt from "react-tilt"
import Img from "gatsby-image"
import SEO from "../components/seo"

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin-top: ${({ theme }) => theme.spacing["10"]};
  gap: ${({ theme }) => theme.spacing["10"]};

  ${({ theme }) =>
    theme.mobileLandscape`
      grid-template-columns: 1fr 1fr;`};

  ${({ theme }) =>
    theme.tabletLandscape`
      grid-template-columns: 1fr 1fr 1fr;`};
`

const BookDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const BookTitle = styled(Headings.H5)`
  font-family: ${({ theme }) => theme.font.serif};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-top: ${({ theme }) => theme.spacing["3"]};
  margin-bottom: ${({ theme }) => theme.spacing["4"]};
  text-align: center;
  line-height: ${({ theme }) => theme.lineHeight.snug};
`

const BookAuthor = styled.div`
  font-family: ${({ theme }) => theme.font.serif};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

const PageDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const BookTilt = styled(Tilt)`
  display: flex;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: ${({ theme }) => theme.spacing["2"]};
`

const Book = ({ title, authors, coverImg, path }) => (
  <BookDiv>
    <Link to={`/${path}`}>
      <BookTilt options={{ scale: 1.05 }}>
        <Img fixed={coverImg} alt={title} />
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
      <SEO title="Books" />
      <PageDesc>
        <Headings.SerifH1>Books</Headings.SerifH1>
        <P style={{ maxWidth: "500px", textAlign: "center" }}>
          Here are some of the books that I've read recently and my thoughts on
          them. You can also find my book list{" "}
          <StyledAnchor
            href={`booklist.pdf`}
            rel="noopener noreferrer"
            target="_blank"
          >
            here
          </StyledAnchor>
          .
        </P>
      </PageDesc>
      {edges.length === 0 ? (
        <P style={{ margin: "0 auto" }}>There are no books here</P>
      ) : (
        <BookGrid>
          {edges.map(({ node }, index) => {
            const fm = node.frontmatter
            const title = fm.title
            const authors = fm.authors
            const useBackup = fm.use_backup
            const coverImg = useBackup
              ? fm.backupImage.childImageSharp.fixed
              : node.coverImg.childImageSharp.fixed

            return (
              <Book
                key={index}
                title={title}
                authors={authors}
                coverImg={coverImg}
                path={node.fields.pathName}
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
          coverImg {
            childImageSharp {
              fixed(width: 160) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          frontmatter {
            title
            authors
            use_backup
            backupImage {
              childImageSharp {
                fixed(width: 160) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            pathName
          }
        }
      }
    }
  }
`
