import styled from "styled-components"

export const ParaWidthContent = styled.div`
  grid-column: main;

  ${({ theme }) => theme.tabletPortrait`
    grid-column: para;
  `};
`
