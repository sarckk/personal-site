import React from "react"
import styled from "styled-components"
import Header from "../header"
import Footer from "../footer"

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  padding-top: 100px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

const ContentArea = styled.main`
  flex: 1 0 auto;
`

export default ({ children }) => {
  return (
    <Container>
      <Header />
      <ContentArea>{children}</ContentArea>
      <Footer />
    </Container>
  )
}
