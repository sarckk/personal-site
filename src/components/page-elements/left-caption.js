import styled from "styled-components"

export const LeftCaption = styled.div`
  order: -1;
  text-align: right;
  padding: ${({ theme }) => theme.spacing["6"]};
  color: ${({ theme }) => theme.colors.gray[600]};
`
