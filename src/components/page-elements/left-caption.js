import styled from "styled-components"

export const LeftCaption = styled.div`
  order: -1;
  text-align: right;
  padding: ${({ theme }) => theme.spacing["6"]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray[600]};
`
