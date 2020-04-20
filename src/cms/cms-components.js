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
} from "../components/page-elements"
import styled from "styled-components"

const BlogContent = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
  grid-column: full;
  display: inherit;
  grid-template-columns: inherit;
  grid-auto-rows: inherit;

  > * {
    grid-column: para;
  }
`

export const CMS_SHORTCODES = {
  FullWidthDiv,
  RightHandContent,
  LeftHandContent,
  MainWidthContent,
  ParaWidthContent,
  LeftCaption,
  RightCaption,
}

export const CMS_WRAPPER = {
  wrapper: BlogContent,
}

export const CMS_COMPONENTS = {
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
}
