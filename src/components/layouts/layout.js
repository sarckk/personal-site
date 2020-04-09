import React from "react"
import styled from "styled-components"
import Header from "../header"
import Footer from "../footer"

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 120px 0;
  height: 100%;
`

export default ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  )
}
