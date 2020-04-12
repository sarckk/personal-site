import React, { useState, useRef, useEffect } from "react"
import { UnstyledLink } from "./page-elements"
import styled, { css } from "styled-components"
import SearchIcon from "../images/search.svg"
import { Link, useStaticQuery, graphql } from "gatsby"
import { throttle } from "lodash"

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  transition: transform 0.4s ease;
  z-index: 3;
  transform: ${props => (props.hide ? "translateY(-100%)" : "translateY(0)")};
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  ${props =>
    props.scrolledDown &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
    `}
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 5px;
  max-width: 850px;
  margin: 0 auto;
  ${props =>
    !props.scrolledDown &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
    `}
  position: relative;
`

const SiteTitle = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  margin-right: auto;
  z-index: 2;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
`

const HeaderNav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  height: 27px;
  z-index: 2;
`

const HeaderLI = styled.li`
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin: 0 ${({ theme }) => theme.spacing["6"]};
  display: inline-block;
  transition: all 0.4s ease;
  height: 100%;
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
    stroke: ${({ theme }) => theme.colors.gray[600]};
    transition: all 0.3s ease;
  }
`

const SearchPanel = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  width: 60%;
  height: 40px;
  opacity: ${props => (props.visible ? "1" : "0")};
  z-index: ${props => (props.visible ? "2" : "-1")};
  transition: all ${props => (props.visible ? "200ms" : "0ms")} ease-out;
  transition-delay: ${props => (props.visible ? "350ms" : "50ms")};
  transform: ${props => (props.visible ? "translateX(0)" : "translateX(2%)")};
`

const SearchForm = styled.form`
  flex-grow: 1;
  margin-left: 5px;
`

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0 5px;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.transparent};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`

const SearchIcon17px = styled(SearchIcon)`
  height: 17px;
  width: 17px;
`

const SearchIcon17pxGray = styled(SearchIcon17px)`
  .cls-1 {
    stroke: ${({ theme }) => theme.colors.gray[600]};
  }
`

const SearchCloseBar = styled.div`
  height: 16px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.gray[600]};
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
      background-color: ${({ theme }) => theme.colors.gray[500]};
    }
  }
`

export default () => {
  const [searchVisible, setSearchVisible] = useState(false)
  const [scrolledDown, setScrolledDown] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)
  const searchInput = useRef(null)
  const siteTitle = useRef(null)

  const toggleSearch = () => {
    setSearchVisible(searchVisible => !searchVisible)

    if (!searchVisible) {
      searchInput.current.focus()
    } else {
      setTimeout(() => (searchInput.current.value = ""), 200)
    }
  }

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  useEffect(() => {
    const el = siteTitle.current
    const originalText = el.innerText.substr(0)
    const NUMBER_OF_REPLACES = 4
    const NUMBER_OF_SHUFFLES = 5
    const DELAY = 80
    const replacementChars =
      '!"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSUVWXYZ[]^_`abcdefghijklmnopqrsuvwxyz{|}~¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷░▒▓'

    const getRandomChar = () => {
      return replacementChars[
        Math.floor(Math.random() * replacementChars.length)
      ]
    }

    const replaceCharAt = (s, c, index) => {
      return s.substr(0, index) + c + s.substr(index + 1)
    }

    let frameRequest

    el.addEventListener("mouseover", () => {
      let replacements = []

      for (let i = 0; i < NUMBER_OF_REPLACES; i++) {
        replacements[i] = {
          indexToReplace: Math.floor(Math.random() * originalText.length),
          timesToComplete: Math.floor(Math.random() * NUMBER_OF_SHUFFLES) + 1,
          timesIterated: 0,
          iterateFinished: false,
        }
      }

      let completedScramble = 0

      const scramble = () => {
        console.log("SCRAMBLING")
        let output = el.innerText

        replacements.forEach(object => {
          const {
            indexToReplace,
            timesToComplete,
            timesIterated,
            iterateFinished,
          } = object

          if (iterateFinished) {
            return
          }

          if (timesIterated === timesToComplete) {
            completedScramble++
            object.iterateFinished = true
          }

          if (Math.random() < 0.8) {
            output = replaceCharAt(output, getRandomChar(), indexToReplace)
            object.timesIterated = timesIterated + 1
          }
        })

        el.innerText = output

        if (completedScramble < NUMBER_OF_REPLACES) {
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
            }, DELAY)
          }).then(() => {
            frameRequest = requestAnimationFrame(scramble)
          })
        } else {
          cancelAnimationFrame(frameRequest)
          el.innerText = originalText
        }
      }

      scramble()
    })

    el.addEventListener("mouseout", () => {
      cancelAnimationFrame(frameRequest)
      el.innerText = originalText
    })

    return () => {
      console.log("unmounted hover listener")
      cancelAnimationFrame(frameRequest)
      el.innerText = originalText
    }
  }, [])

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
    <HeaderContainer hide={hideHeader} scrolledDown={scrolledDown}>
      <HeaderContent scrolledDown={scrolledDown}>
        <SiteTitle ref={siteTitle} className="scramble" to="/">
          {data.site.siteMetadata.title}
        </SiteTitle>

        <HeaderNav>
          <ListItem to="/about" visible={searchVisible}>
            about
          </ListItem>
          <ListItem to="/work" visible={searchVisible}>
            work
          </ListItem>
          <ListItem to="/blog" visible={searchVisible}>
            blog
          </ListItem>
          <ListItem to="/books" visible={searchVisible}>
            books
          </ListItem>
          <HeaderLI visible={searchVisible}>
            <SearchButton onClick={toggleSearch}>
              <SearchIcon17px />
            </SearchButton>
          </HeaderLI>
        </HeaderNav>

        <SearchPanel visible={searchVisible}>
          <SearchIcon17pxGray />
          <SearchForm>
            <SearchInput placeholder="Start searching..." ref={searchInput} />
          </SearchForm>
          <SearchClose onClick={toggleSearch}>
            <SearchCloseLeft />
            <SearchCloseRight />
          </SearchClose>
        </SearchPanel>
      </HeaderContent>
    </HeaderContainer>
  )
}
