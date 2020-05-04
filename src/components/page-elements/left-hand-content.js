import styled from "styled-components"

export const LeftHandContent = styled.div`
  grid-column: full;

  ${({ theme }) => theme.tabletLandscape`
    grid-column: full / main;
  `};
`
