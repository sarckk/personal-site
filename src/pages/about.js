import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { Headings, P, UnstyledLink } from "../components/page-elements"

const SerifH1 = styled(Headings.H1)`
  font-family: ${({ theme }) => theme.font.serif};
`

const StyledLink = styled(UnstyledLink)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

export default () => {
  return (
    <Layout>
      <SerifH1>Hey, I'm Shin</SerifH1>
      <P>I study Computer Science at University College London, UK.</P>
      <P>
        I'm passionate about developing cool things with code, ranging from
        applications to art. To me, programming is first and foremost a tool - a
        tool that enables creative pursuits of all kinds!
      </P>
      <P>
        Anyways, you might be thinking:{" "}
        <strong>what the hell is the point of this website?</strong>
      </P>
      <P>
        Turns out, I'm interested in a lot of things - that also means I have a
        lot of unorganised thoughts. This site is my attempt to refine and
        organize some of them.
      </P>
      <P>
        I also try to read book whenever I can. After I finish a book, I might
        write about it <StyledLink to="/books">here</StyledLink>.
      </P>
    </Layout>
  )
}
