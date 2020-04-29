import React from "react"
import styled from "styled-components"
import Header from "../header"
import Footer from "../footer"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  padding-top: 75px;
  flex: 1 1 auto;
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr) [main-start] 60px [para-start] minmax(
      0,
      650px
    )
    [para-end] 60px [main-end] minmax(1em, 1fr) [full-end];
  grid-auto-rows: minmax(min-content, max-content);

  > * {
    grid-column: main;
  }
`

export default ({ location, children }) => {
  return (
    <Container>
      <Header location={location}/>
      <Content>{children}</Content>
      <Footer />
    </Container>
  )
}
