import styled from "styled-components"

export const FullWidthDiv = styled.div`
  grid-column: full !important;
  margin: ${({ theme }) => theme.spacing["12"]} 0;
  display: inherit;
  grid-template-columns: inherit;
  align-items: end;

  p {
    margin-bottom: 0;
  }
`
