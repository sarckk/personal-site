import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`
