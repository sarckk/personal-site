import React from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { Headings, P, StyledAnchor } from "../components/page-elements"
import me from "../images/me.jpeg"

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  ${({ theme }) => theme.tabletPortrait`
    & {
      grid-template-columns: 1fr 1fr;
    }
  `};
`

const AboutTextFirstPart = styled.div`
  padding-right: 0;

  ${({ theme }) => theme.tabletPortrait`
    padding-right: 30px;
    & {
      order: 1;
    }
  `};
`

const AboutTextSecondPart = styled.div`
  ${({ theme }) => theme.tabletPortrait`
    & {
      order: 3;
      grid-column: 1 / span 2;
    }
  `};
`

const AboutPic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[400]};

  ${({ theme }) => theme.tabletPortrait`
    & {
      order: 2;
    }
  `};
`

const MyPic = styled.img`
  max-width: 100%;
  clip-path: url(#blob);
`

export default () => {
  return (
    <Layout>
      <AboutContainer>
        <AboutPic>
          <MyPic src={me} alt="me" />
        </AboutPic>
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
            translation, mediating the translation of ideas to reality and, by
            extension, our subjective experiences. Gaining mastery of a
            programming language is thus akin to gaining creative freedom —
            freedom to make any ideas come alive. How empowering!
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
      <svg width="0" height="0">
        <defs>
          <clipPath id="blob" transform="translate(170,250) scale(0.95)">
            <path
              d="M142.1,-180C177.8,-139.3,196.3,-88.6,210.1,-33.6C224,21.4,233.2,80.7,214,132.4C194.7,184.2,147,228.3,93.2,241.7C39.4,255,-20.3,237.4,-64.4,207.9C-108.5,178.4,-137,137,-154,95C-171,53,-176.6,10.4,-169.4,-29.8C-162.2,-69.9,-142.1,-107.7,-111.8,-149.4C-81.4,-191,-40.7,-236.5,6.2,-243.9C53.1,-251.3,106.3,-220.7,142.1,-180Z"
              fill="#FFB4BC"
            />
          </clipPath>
        </defs>
      </svg>
    </Layout>
  )
}
