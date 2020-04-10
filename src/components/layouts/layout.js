import React from "react"
import styled from "styled-components"
import Header from "../header"
import Footer from "../footer"

const Container = styled.div`
  width: 850px;
  margin: 0 auto;
  padding-top: 100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentArea = styled.main`
  flex: 1 0 auto;
  width: 800px;
  margin-bottom: ${({ theme }) => theme.spacing["20"]};
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
