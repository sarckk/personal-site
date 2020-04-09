import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const FooterContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
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
