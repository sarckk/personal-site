import styled from "styled-components"

export const P = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing["6"]};

  strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`
