import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const HomeContainer = styled.div`
  display: flex;
`

const HomeLink = styled(Link)`
  margin-right: ${({ theme }) => theme.spacing["2"]};
  margin-left: ${({ theme }) => theme.spacing["2"]};
  transition all 0.3s ease;
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: ${({ theme }) => theme.font.alternateSerif};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`

const HomeNav = () => (
  <HomeContainer>
    <HomeLink to="/about">about</HomeLink>
    <HomeLink to="/work">work</HomeLink>
    <HomeLink to="/blog">blog</HomeLink>
    <HomeLink to="/books">books</HomeLink>
  </HomeContainer>
)

export default HomeNav
