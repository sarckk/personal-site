import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import {
  Headings,
  P,
  StyledAnchor,
} from "../components/page-elements"

const AboutContainer = styled.div`
  // mobile-first

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  @media only screen and (min-width: 500px) {
    & {
      grid-template-columns: 1fr 1fr;
    }
  }
`

const AboutTextFirstPart = styled.div`
  @media only screen and (min-width: 500px) {
    & {
      order: 1;
    }
  }
`

const AboutTextSecondPart = styled.div`
  @media only screen and (min-width: 500px) {
    & {
      order: 3;
      grid-column: 1 / span 2;
    }
  }
`

const TreeArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dotted ${({ theme }) => theme.colors.gray[400]};
  color: ${({ theme }) => theme.colors.gray[400]};

  @media only screen and (min-width: 500px) {
    & {
      order: 2;
    }
  }
`

export default () => {
  return (
    <Layout>
      <AboutContainer>
        <TreeArea>Placeholder</TreeArea>
        <AboutTextFirstPart>
          <Headings.SerifH1>Hey, I'm Shin</Headings.SerifH1>
          <P>
            I'm a Computer Science undergraduate at{" "}
            <StyledAnchor
              href="https://www.ucl.ac.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              University College London
            </StyledAnchor>
            , UK.
          </P>
          <P>
            I was born in South Korea, and lived in Netherlands and Singapore
            for a while before moving to London for my undergraduate education.
          </P>
          <P>
            I'm passionate about the intersection between technology and
            human-centric design. To me, programming represents a tool for
            translation. Yet instead of translating one language to another, it
            mediates the translation of ideas to reality and, by extension, our
            subjective experiences. Gaining mastery of a programming language is
            thus akin to gaining creative freedom — freedom to make any ideas
            come alive. How empowering!
          </P>
        </AboutTextFirstPart>
        <AboutTextSecondPart>
          <P>
            At this point, you might be thinking:{" "}
            <strong>what the hell is the point of this website?</strong>
          </P>
          <P>
            Turns out, I'm interested in a lot of things — that leaves me with a
            lot of random, unorganised thoughts. This site is my attempt to
            refine, organize and connect some of them.
          </P>
        </AboutTextSecondPart>
      </AboutContainer>
    </Layout>
  )
}
