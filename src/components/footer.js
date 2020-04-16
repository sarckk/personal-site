import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const FooterContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.font.alternateSerif};
`

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  )

  return (
    <FooterContainer>
      © {data.site.siteMetadata.author} {new Date().getFullYear()}
    </FooterContainer>
  )
}
