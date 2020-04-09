import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const FooterContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  flex-shrink: 0;
`

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetaData {
            author
          }
        }
      }
    `
  )

  return (
    <FooterContainer>
      © {data.site.siteMetaData.author} {new Date().getFullYear()}
    </FooterContainer>
  )
}
