import styled from "styled-components"

export const PostDate = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  font-family: ${({ theme }) => theme.font.sans};
  margin-top: ${({ theme }) => theme.spacing["2"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`
