import styled from "styled-components"

export const OL = styled.ol`
  margin-left: ${({ theme }) => theme.spacing["8"]};
  margin-bottom: ${({ theme }) => theme.spacing["3"]};
  list-style-type: decimal;
`
