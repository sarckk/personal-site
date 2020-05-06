import React, { useState, useEffect } from "react"
import { UnstyledLink } from "../page-elements"
import styled, { css } from "styled-components"
import SearchIcon from "../../images/search.inline.svg"
import { throttle } from "lodash"
import { Search } from "./search"
import { ScrambleTitle } from "./scramble-title"

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  font-family: ${({ theme }) => theme.font.alternateSerif};
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.tabletPortrait`
    z-index: 2;
    position: fixed;
    transition: transform 0.1s ease-out;
    transform: ${props => (props.hide ? "translateY(-100%)" : "translateY(0)")};
    backdrop-filter: blur(15px);
    background-color: ${props =>
      props.isOnBlog &&
      css`
        ${({ theme }) => theme.colors.transparent}
      `};
    ${props =>
      props.scrolledDown &&
      css`
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
        background-color: rgba(255, 255, 255, 0.7);
      `}
  `};
`

const HeaderDiv = styled.div`
  height: 50px;
  padding: 6px 20px 0;
  margin: 0 auto;
  max-width: 850px;

  ${({ theme }) => theme.tabletPortrait`
    padding: 6px 15px 9px;
  `};
`

const InnerHeaderDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
  padding-bottom: 6px;
  position: relative;

  ${({ theme }) => theme.tabletPortrait`
    justify-content: center;
    padding-bottom: 8px;
    border-bottom: 1px solid
      ${props => {
        if (!props.scrolledDown) {
          return props.isOnBlog
            ? css`
                ${({ theme }) => theme.colors.gray[500]}
              `
            : css`
                ${({ theme }) => theme.colors.gray[300]}
              `
        } else {
          return css`transparent`
        }
      }};
  `};
`

const HeaderNav = styled.ul`
  list-style: none;
  transform: ${props => (props.active ? "translateY(0)" : "translateY(1%)")};
  opacity: ${props => (props.active ? "1" : "0")};
  z-index: ${props => (props.active ? "3" : "-1")};
  width: 100%;
  transition: all 0.25s ease;
  align-items: center;
  position: absolute;
  top: 49px;
  left: 0;
  background-color: white;
  height: 100vh;

  ${({ theme }) => theme.tabletPortrait`
     flex-direction: column;
     z-index: 3;
     width: auto;
     height: 36px;
     display: flex;
     flex-direction: row;
     position: static;
     transform: translateY(0);
     background-color: transparent;
     box-shadow: none;
     padding: 0;
     opacity: 1;

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
  `};
`

const HeaderLI = styled.li`
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
  display: inline-block;
  transition: all 0.4s ease;
  width: 100%;

  :first-child {
    border-top: 0;
  }

  ${({ theme }) => theme.tabletPortrait`
    height: 27px;
    width: auto;
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin: 0 ${({ theme }) => theme.spacing["6"]};
    border-top: 0;
  `};
`

const HeaderLink = styled(UnstyledLink)`
  display: block;
  padding: 20px 0;
  font-size: ${({ theme }) => theme.fontSize["2xl"]};

  ${({ theme }) => theme.tabletPortrait`
    font-size:initial; 
    padding: 0;
  `};
`

const Hamburger = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 36px;
  height: 36px;

  ${({ theme }) => theme.tabletPortrait`
     display: none;
  `};
`

const HamburgerLine = styled.span`
  height: 2px;
  width: 22px;
  position: absolute;
  display: block;
  background-color: ${({ theme }) => theme.colors.gray[800]};
  border-radius: 2px;
  left: 7px;
  top: 17px;
  transition: transform 0.3s cubic-bezier(0.77, 0.01, 0.41, 0.98),
    opacity 0.3s ease;
  transform-origin: 50% 50%;

  :first-child {
    transform: translateY(-6px);
  }

  :nth-child(2) {
    opacity: 1;
    transition-delay: 100ms;
  }

  :last-child {
    transform: translateY(6px);
  }

  ${props =>
    props.active &&
    css`
      :first-child {
        transform: rotate(45deg);
      }

      :nth-child(2) {
        opacity: 0;
        transition-delay: 0s;
      }

      :last-child {
        transform: rotate(-45deg);
      }
    `}
`

const ListItem = props => (
  <HeaderLI visible={props.visible}>
    <HeaderLink to={props.to} onClick={props.clickFn}>
      {props.children}
    </HeaderLink>
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

const MobileSearchButton = styled(SearchButton)`
  text-align: center;
  display: block;
  height: 36px;
  width: 36px;

  ${({ theme }) => theme.tabletPortrait`
    display: none;
  `};
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
  z-index: ${props => (props.visible ? "4" : "-1")};
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

const SearchHeaderLI = styled(HeaderLI)`
  display: none;

  ${({ theme }) => theme.tabletPortrait`
    display: block;
  `};
`

export default ({ location, mobileSearchHandler }) => {
  const [searchVisible, setSearchVisible] = useState(false)
  const [scrolledDown, setScrolledDown] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)
  const [mobileMenuActive, setMobileMenuActive] = useState(false)
  const isOnBlog = location && location.pathname === "/blog" ? true : false

  const makeBodyScrollable = () => {
    if (window !== undefined) {
      document.body.classList.remove("no-overflow")
    }
  }
  const toggleSearch = () => {
    setSearchVisible(searchVisible => !searchVisible)
  }

  const toggleMobileSearch = () => {
    makeBodyScrollable()

    if (mobileMenuActive) {
      setMobileMenuActive(false)
    }

    mobileSearchHandler(mobileSearchVisible => !mobileSearchVisible)
  }

  const toggleMobileMenu = () => {
    if (window !== undefined) {
      const bodyClasses = document.body.classList
      if (mobileMenuActive) {
        bodyClasses.remove("no-overflow")
      } else {
        bodyClasses.add("no-overflow")
      }
    }

    mobileSearchHandler(false)

    setMobileMenuActive(mobileMenuActive => !mobileMenuActive)
  }

  useEffect(() => {
    if (window === undefined) {
      return
    }

    const mql = window.matchMedia("(min-width: 768px)")

    const mediaListener = media => {
      if (media.matches) {
        document.body.classList.remove("no-overflow")
        setMobileMenuActive(false)
        mobileSearchHandler(false)
      } else {
        setSearchVisible(false)
      }
    }

    mediaListener(mql)
    mql.addListener(mediaListener)

    return () => mql.removeListener(mediaListener)
  }, [mobileSearchHandler])

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
      window.removeEventListener("scroll", throttledScrollHandler)
    }
  }, [])

  return (
    <HeaderContainer
      isOnBlog={isOnBlog}
      hide={hideHeader}
      scrolledDown={scrolledDown}
    >
      <HeaderDiv>
        <InnerHeaderDiv isOnBlog={isOnBlog} scrolledDown={scrolledDown}>
          <MobileSearchButton onClick={toggleMobileSearch}>
            <SearchIcon17px />
          </MobileSearchButton>

          <ScrambleTitle />

          <Hamburger onClick={toggleMobileMenu}>
            <HamburgerLine active={mobileMenuActive} />
            <HamburgerLine active={mobileMenuActive} />
            <HamburgerLine active={mobileMenuActive} />
          </Hamburger>

          <HeaderNav visible={searchVisible} active={mobileMenuActive}>
            <ListItem to="/about" clickFn={makeBodyScrollable}>
              about
            </ListItem>
            <ListItem to="/work" clickFn={makeBodyScrollable}>
              work
            </ListItem>
            <ListItem to="/blog" clickFn={makeBodyScrollable}>
              blog
            </ListItem>
            <ListItem to="/books" clickFn={makeBodyScrollable}>
              books
            </ListItem>
            <SearchHeaderLI active={mobileMenuActive}>
              <SearchButton onClick={toggleSearch}>
                <SearchIcon17px />
              </SearchButton>
            </SearchHeaderLI>
          </HeaderNav>

          <SearchPanel visible={searchVisible}>
            <SearchIcon17pxGray />
            <Search visible={searchVisible} type="desktop" />
            <SearchClose onClick={toggleSearch}>
              <SearchCloseLeft />
              <SearchCloseRight />
            </SearchClose>
          </SearchPanel>
        </InnerHeaderDiv>
      </HeaderDiv>
    </HeaderContainer>
  )
}
