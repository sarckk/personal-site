import styled from "styled-components"

export const RightHandContent = styled.div`
  grid-column: full;

  ${({ theme }) => theme.tabletLandscape`
    grid-column: main / full;
  `};
`
