import React, { useState, useEffect } from "react"
import { UnstyledLink } from "../page-elements"
import styled, { css } from "styled-components"
import SearchIcon from "../../images/search.inline.svg"
import { throttle } from "lodash"
import { Search } from "./search"
import { ScrambleTitle } from "./scramble-title"

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  transition: transform 0.1s ease-out;
  z-index: 3;
  transform: ${props => (props.hide ? "translateY(-100%)" : "translateY(0)")};
  background-color: ${props =>
    props.isOnBlog &&
    css`
      ${({ theme }) => theme.colors.transparent}
    `};
  backdrop-filter: blur(15px);
  font-family: ${({ theme }) => theme.font.alternateSerif};
  ${props =>
    props.scrolledDown &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
      background-color: rgba(255, 255, 255, 0.7);
    `}
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 5px 9px;
  max-width: 850px;
  margin: 0 auto;
  border-bottom: 1px solid ${props => {
    if (!props.scrolledDown) {
      return props.isOnBlog
        ? css`
            ${({ theme }) => theme.colors.gray[500]};
          `
        : css`
            ${({ theme }) => theme.colors.gray[300]};
          `
    }
  }}
  position: relative;
`

const HeaderNav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  height: 27px;
  z-index: 2;

  > li {
    transform: ${props => (props.visible ? "scale(0)" : "scale(1)")};

    &:nth-child(1) {
      transition-delay: ${props => (props.visible ? "310ms" : "150ms")};
    }

    &:nth-child(2) {
      transition-delay: ${props => (props.visible ? "270ms" : "190ms")};
    }

    &:nth-child(3) {
      transition-delay: ${props => (props.visible ? "230ms" : "230ms")};
    }

    &:nth-child(4) {
      transition-delay: ${props => (props.visible ? "190ms" : "270ms")};
    }

    &:nth-child(5) {
      transition-delay: ${props => (props.visible ? "150ms" : "310ms")};
      margin-right: 0;
    }
  }
`

const HeaderLI = styled.li`
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin: 0 ${({ theme }) => theme.spacing["6"]};
  display: inline-block;
  transition: all 0.4s ease;
  height: 100%;
`

const ListItem = props => (
  <HeaderLI visible={props.visible}>
    <UnstyledLink to={props.to}>{props.children}</UnstyledLink>
  </HeaderLI>
)

const SearchButton = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.transparent};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 27px;

  &:focus {
    outline: none;
  }

  &:hover .cls-1 {
    stroke: ${({ theme }) => theme.colors.gray[700]};
    transition: all 0.3s ease;
  }
`

const SearchIcon17px = styled(SearchIcon)`
  height: 17px;
  width: 17px;
`

const SearchPanel = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  width: 60%;
  height: 100%;
  opacity: ${props => (props.visible ? "1" : "0")};
  z-index: ${props => (props.visible ? "2" : "-1")};
  transition: all ${props => (props.visible ? "200ms" : "0ms")} ease-out;
  transition-delay: ${props => (props.visible ? "350ms" : "50ms")};
  transform: ${props => (props.visible ? "translateX(0)" : "translateX(2%)")};
`

const SearchIcon17pxGray = styled(SearchIcon17px)`
  .cls-1 {
    stroke: ${({ theme }) => theme.colors.gray[700]};
  }
`

const SearchCloseBar = styled.div`
  height: 16px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.gray[700]};
  position: absolute;
  top: calc(50% - 8px);
  left: 50%;
  transition: all 0.3s ease;
`

const SearchCloseLeft = styled(SearchCloseBar)`
  transform: rotate(-45deg) translateX(-50%);
`

const SearchCloseRight = styled(SearchCloseBar)`
  transform: rotate(45deg) translateX(-50%);
`

const SearchClose = styled.button`
  position: relative;
  background-color: ${({ theme }) => theme.colors.transparent};
  border: 0;
  height: 100%;
  width: 25px;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    div {
      background-color: ${({ theme }) => theme.colors.gray[600]};
    }
  }
`

export default props => {
  const [searchVisible, setSearchVisible] = useState(false)
  const [scrolledDown, setScrolledDown] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)
  const isOnBlog = props.location ? true : false

  const toggleSearch = () => {
    setSearchVisible(searchVisible => !searchVisible)
  }

  useEffect(() => {
    let prevScrollOffset = 0

    const throttledScrollHandler = throttle(() => {
      const currentScrollOffset = window.pageYOffset
      const scrolledMinToHide = currentScrollOffset > 60
      const isScrolledDown = prevScrollOffset < currentScrollOffset
      prevScrollOffset = currentScrollOffset
      setHideHeader(isScrolledDown && scrolledMinToHide)

      const scrolledMinToAddBorder = currentScrollOffset > 0
      setScrolledDown(scrolledMinToAddBorder)
    }, 250)

    window.addEventListener("scroll", throttledScrollHandler)

    return () => {
      console.log("unmounted scroll listener") // why isn't this called?
      window.removeEventListener("scroll", throttledScrollHandler)
    }
  }, [])

  return (
    <HeaderContainer
      isOnBlog={isOnBlog}
      hide={hideHeader}
      scrolledDown={scrolledDown}
    >
      <HeaderContent isOnBlog={isOnBlog} scrolledDown={scrolledDown}>
        <ScrambleTitle />

        <HeaderNav visible={searchVisible}>
          <ListItem to="/about">about</ListItem>
          <ListItem to="/work">work</ListItem>
          <ListItem to="/blog">blog</ListItem>
          <ListItem to="/books">books</ListItem>
          <HeaderLI>
            <SearchButton onClick={toggleSearch}>
              <SearchIcon17px />
            </SearchButton>
          </HeaderLI>
        </HeaderNav>

        <SearchPanel visible={searchVisible}>
          <SearchIcon17pxGray />
          <Search visible={searchVisible} />
          <SearchClose onClick={toggleSearch}>
            <SearchCloseLeft />
            <SearchCloseRight />
          </SearchClose>
        </SearchPanel>
      </HeaderContent>
    </HeaderContainer>
  )
}
