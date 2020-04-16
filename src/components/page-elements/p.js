import styled from "styled-components"

export const P = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing["6"]};
  line-height: ${({ theme }) => theme.lineHeight.sm};
`
