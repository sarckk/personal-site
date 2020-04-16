import styled from "styled-components"

export const RightCaption = styled.div`
  text-align: left;
  padding: ${({ theme }) => theme.spacing["6"]};
  grid-column: main-end / full;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray[600]};
`
