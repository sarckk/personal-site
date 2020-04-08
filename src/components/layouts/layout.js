import React from "react"
import styled from "styled-components"
import Header from "../header"

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

export default ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}
