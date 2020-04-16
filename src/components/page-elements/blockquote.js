import styled from "styled-components"

export const BlockQuote = styled.div`
  border-left: 3px solid ${({ theme }) => theme.colors.gray[500]};
  margin: 1.5em 10px;
  padding: ${({ theme }) => theme.spacing["1"]}
    ${({ theme }) => theme.spacing["5"]};
  quotes: "“" "”";

  :before {
    color: ${({ theme }) => theme.colors.gray[400]};
    content: open-quote;
    font-size: ${({ theme }) => theme.fontSize["5xl"]};
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  p {
    display: inline;
  }
`
