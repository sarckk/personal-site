import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const FooterContainer = styled.div`
  text-align: center;
  padding: 30px 0;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.font.alternateSerif};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray[600]};
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
