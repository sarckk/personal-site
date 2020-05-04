import { Link } from "gatsby"
import styled from "styled-components"

export const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray[900]};
  transition: all 0.3s ease;


  &:hover {
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`
