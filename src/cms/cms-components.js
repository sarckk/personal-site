import {
  Headings,
  BlockQuote,
  PRE,
  P,
  UL,
  OL,
  LI,
  StyledAnchor,
  HR,
  FullWidthDiv,
  RightHandContent,
  LeftHandContent,
  MainWidthContent,
  ParaWidthContent,
  LeftCaption,
  RightCaption,
  StyledLink,
} from "../components/page-elements"
import styled from "styled-components"

export const ParaContentWrapper = styled.div`
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
  display: inherit;
  grid-template-columns: inherit;
  grid-auto-rows: inherit;
  grid-column: full;
  font-size: ${({ theme }) => theme.fontSize.lg};

  > * {
    grid-column: main;
  }

  ${({ theme }) => theme.tabletPortrait`
    > * {
      grid-column: para;
    }
  `};
`

export const CMS_SHORTCODES = {
  FullWidthDiv,
  RightHandContent,
  LeftHandContent,
  MainWidthContent,
  ParaWidthContent,
  LeftCaption,
  RightCaption,
  StyledLink,
}

export const CMS_WRAPPER = {
  wrapper: ParaContentWrapper,
}

export const CMS_COMPONENTS = {
  h1: Headings.H1,
  h2: Headings.H2,
  h3: Headings.H3,
  h4: Headings.H4,
  h5: Headings.H5,
  h6: Headings.H6,
  p: P,
  a: StyledAnchor,
  ul: UL,
  ol: OL,
  li: LI,
  blockquote: BlockQuote,
  pre: PRE,
  hr: HR,
}
