import React, { useState, useRef } from "react"
import { UnstyledLink } from "./page-elements"
import styled from "styled-components"
import SearchIcon from "../images/search.svg"
import { useStaticQuery, graphql } from "gatsby"

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 800px;
  align-items: center;
  padding: 20px 0;
  transition: transform 0.4s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[500]};
  z-index: 1;
`

const SiteTitle = styled(UnstyledLink)`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  margin-right: auto;
`

const HeaderNav = styled.ul`
  list-style: none;
  margin-right: ${({ theme }) => theme.spacing["2"]};
`

const HeaderLI = styled.li`
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin: 0 ${({ theme }) => theme.spacing["6"]};
  display: inline-block;
  transition: all 0.4s ease;
  transform: ${props => (props.visible ? "scale(0)" : "scale(1)")};

  &:nth-child(1) {
    transition-delay: ${props => (props.visible ? "360ms" : "200ms")};
  }

  &:nth-child(2) {
    transition-delay: ${props => (props.visible ? "320ms" : "240ms")};
  }

  &:nth-child(3) {
    transition-delay: ${props => (props.visible ? "280ms" : "280ms")};
  }

  &:nth-child(4) {
    transition-delay: ${props => (props.visible ? "240ms" : "320ms")};
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
  height: 18px;
  width: 18px;
  transition: all 0.4s ease;
  transition-delay: ${props => (props.visible ? "200ms" : "360ms")};
  transform: ${props => (props.visible ? "scale(0)" : "scale(1)")};

  &:focus {
    outline: none;
  }
`

const SearchPanel = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  overflow: hidden;
  right: 0;
  width: 60%;
  height: 40px;
  opacity: ${props => (props.visible ? "1" : "0")};
  z-index: ${props => (props.visible ? "1" : "-1")};
  transition: all ${props => (props.visible ? "300ms" : "0ms")} ease-out;
  transition-delay: ${props => (props.visible ? "560ms" : "100ms")};
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
  font-size: ${({ theme }) => theme.fontSize.lg};
  background-color: ${({ theme }) => theme.colors.transparent};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`

const SearchIconWithHover = styled(SearchIcon)`
  &:hover .cls-1 {
    stroke: ${({ theme }) => theme.colors.gray[600]};
    transition: all 0.3s ease;
  }
`

const SearchIcon18px = styled(SearchIcon)`
  height: 18px;
  width: 18px;

  .cls-1 {
    stroke: ${({ theme }) => theme.colors.gray[600]};
  }
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
`

const SearchCloseBar = styled.div`
  height: 16px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.gray[600]};
  position: absolute;
  top: calc(50% - 8px);
  left: 50%;
`

const SearchCloseLeft = styled(SearchCloseBar)`
  transform: rotate(-45deg) translateX(-50%);
`

const SearchCloseRight = styled(SearchCloseBar)`
  transform: rotate(45deg) translateX(-50%);
`

export default () => {
  const [searchVisible, setSearchVisible] = useState(false)
  const searchInput = useRef(null)

  const toggleSearch = () => {
    setSearchVisible(!searchVisible)
    searchInput.current.focus()
  }

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetaData {
            title
          }
        }
      }
    `
  )

  return (
    <HeaderContainer>
      <SiteTitle to="/">{data.site.siteMetaData.title}</SiteTitle>

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
      </HeaderNav>

      <SearchButton onClick={toggleSearch} visible={searchVisible}>
        <SearchIconWithHover />
      </SearchButton>

      <SearchPanel visible={searchVisible}>
        <SearchIcon18px />
        <SearchForm>
          <SearchInput placeholder="Start searching..." ref={searchInput} />
        </SearchForm>
        <SearchClose onClick={toggleSearch}>
          <SearchCloseLeft />
          <SearchCloseRight />
        </SearchClose>
      </SearchPanel>
    </HeaderContainer>
  )
}
