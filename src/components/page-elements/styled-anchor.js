import styled from "styled-components"

export const StyledAnchor = styled.a`
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
