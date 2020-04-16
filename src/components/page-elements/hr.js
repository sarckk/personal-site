import styled from "styled-components"

export const HR = styled.hr`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.colors.gray[300]};
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing["10"]};
`
