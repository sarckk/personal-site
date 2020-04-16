import styled from "styled-components"

export const Headings = {
  H1: styled.h1`
    font-size: ${({ theme }) => theme.fontSize["5xl"]};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-top: ${({ theme }) => theme.spacing["7"]};
    margin-bottom: ${({ theme }) => theme.spacing["3"]};
  `,

  H2: styled.h2`
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin-top: ${({ theme }) => theme.spacing["5"]};
    margin-bottom: ${({ theme }) => theme.spacing["3"]};
  `,

  H3: styled.h3`
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    margin-top: ${({ theme }) => theme.spacing["2"]};
    margin-bottom: ${({ theme }) => theme.spacing["2"]};
  `,

  H4: styled.h4`
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    margin-top: ${({ theme }) => theme.spacing["1"]};
    margin-bottom: ${({ theme }) => theme.spacing["2"]};
  `,

  H5: styled.h5`
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.light};
    margin-top: ${({ theme }) => theme.spacing["0"]};
    margin-bottom: ${({ theme }) => theme.spacing["1"]};
  `,

  H6: styled.h6`
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.thin};
    margin-top: ${({ theme }) => theme.spacing["0"]};
    margin-bottom: ${({ theme }) => theme.spacing["0"]};
  `,
}
