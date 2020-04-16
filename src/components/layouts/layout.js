import React from "react"
import styled from "styled-components"
import Header from "../header"
import Footer from "../footer"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding-top: 90px;
  flex: 1 0 auto;
  display: grid;
  grid-template-columns:
    [full-start] minmax(1em, 1fr) [main-start] 75px [para-start] minmax(
      0,
      650px
    )
    [para-end] 75px [main-end] minmax(1em, 1fr) [full-end];
  grid-auto-rows: minmax(min-content, max-content);
  margin-bottom: 45px;

  > * {
    grid-column: main;
  }
`

export default ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Container>
  )
}
