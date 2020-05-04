import React, { useState } from "react"
import styled from "styled-components"
import Header from "../header"
import Footer from "../footer"
import { Search } from "../header/search"

const Container = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const Content = styled.div`
  padding-top: 75px;
  flex: 1 1 auto;
  display: grid;
  grid-template-columns:
    [full-start] minmax(2em, 1fr) [main-start] 60px [para-start] minmax(
      0,
      650px
    )
    [para-end] 60px [main-end] minmax(2em, 1fr) [full-end];
  grid-auto-rows: minmax(min-content, max-content);

  > * {
    grid-column: main;
  }
`

const MobileSearchDropdown = styled.div`
  transform: ${props => (props.active ? "translateY(0)" : "translateY(1%)")};
  opacity: ${props => (props.active ? "1" : "0")};
  z-index: ${props => (props.active ? "3" : "-1")};
  width: 100%;
  padding: 0 20px;
  transition: all 0.25s ease;
  margin-top: 0px;
  align-items: center;
  position: absolute;
  top: 49px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);

  ${({ theme }) => theme.tabletPortrait`
    display: none;
  `};
`

export default ({ location, children }) => {
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false)

  return (
    <>
      <Container>
        <Header
          location={location}
          mobileSearchHandler={setMobileSearchVisible}
        />
        <Content>{children}</Content>
        <Footer />
      </Container>
      <MobileSearchDropdown active={mobileSearchVisible}>
        <Search visible={mobileSearchVisible} type="mobile" />
      </MobileSearchDropdown>
    </>
  )
}
