import React from "react"
import { GlobalStyle, theme } from "./src/theme/global-style"
import { ThemeProvider } from "styled-components"
import { MDXProvider } from "@mdx-js/react"
import styled from "styled-components"
import {
  Headings,
  BlockQuote,
  PRE,
  P,
  STRONG,
  StyledAnchor,
  UL,
  OL,
  LI,
  HR,
  FullWidthDiv,
  RightHandContent,
  LeftHandContent,
  MainWidthContent,
  ParaWidthContent,
  LeftCaption,
  RightCaption,
} from "./src/components/page-elements"

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  grid-auto-rows: inherit;

  > * {
    grid-column: para;
  }
`

const mdxComponentBindings = {
  h1: Headings.H1,
  h2: Headings.H2,
  h3: Headings.H3,
  h4: Headings.H4,
  h5: Headings.H5,
  h6: Headings.H6,
  p: P,
  strong: STRONG,
  a: StyledAnchor,
  ul: UL,
  ol: OL,
  li: LI,
  blockquote: BlockQuote,
  pre: PRE,
  hr: HR,
  FullWidthDiv,
  RightHandContent,
  LeftHandContent,
  MainWidthContent,
  ParaWidthContent,
  LeftCaption,
  RightCaption,
  wrapper: Content,
}

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <MDXProvider components={mdxComponentBindings}>{element}</MDXProvider>
  </ThemeProvider>
)
