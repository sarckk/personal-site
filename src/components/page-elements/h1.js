import styled from "styled-components"

export const H1 = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["5xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing["5"]};
`
