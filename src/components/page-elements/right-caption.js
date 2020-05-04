import styled from "styled-components"

export const RightCaption = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  padding: ${({ theme }) => theme.spacing["6"]};
  grid-column: main;

  ${({ theme }) => theme.tabletPortrait`
   grid-column: para;
  `};

  ${({ theme }) => theme.tabletLandscape`
    text-align: left;
    grid-column: main-end / full;
  `};
`
