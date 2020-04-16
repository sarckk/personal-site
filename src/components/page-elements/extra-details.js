import styled from "styled-components"

export const ExtraDetails = styled.div`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.widest};
  font-family: ${({ theme }) => theme.font.sans};
  margin-top: ${({ theme }) => theme.spacing["2"]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`
