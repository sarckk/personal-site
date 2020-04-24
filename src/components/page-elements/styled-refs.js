import styled, { css } from "styled-components"
import { Link } from "gatsby"

const sharedStyle = css`
  color: ${({ theme }) => theme.colors.anchorColor};
  text-decoration: none;
  background-position: 0 1.1em;
  background-size: 2px 1px;
  background-repeat: repeat-x;

  &:hover {
    color: ${({ theme }) => theme.colors.anchorHover};
    background-image: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.anchorHover} 50%,
      transparent 50%
    );
  }
`

export const StyledLink = styled(Link)`
  ${sharedStyle}
`

export const StyledAnchor = styled.a`
  ${sharedStyle}
`
