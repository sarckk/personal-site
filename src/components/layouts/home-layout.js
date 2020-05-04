import React from "react"
import styled from "styled-components"

const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default ({ children }) => {
  return <HomeContainer>{children}</HomeContainer>
}
