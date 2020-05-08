import React, { useEffect } from "react"
import styled from "styled-components"
import Layout from "../components/layouts/layout"
import { Headings, P, StyledAnchor } from "../components/page-elements"
import SEO from "../components/seo"
import GithubIcon from "../images/github.inline.svg"
import LinkedInIcon from "../images/linkedin.inline.svg"
import FileIcon from "../images/file.inline.svg"

const AboutContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  align-items: center;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.tabletPortrait`
    grid-template-columns: 2fr 1fr;
  `};
`

const AboutTextFirstPart = styled.div`
  padding-right: 0;

  ${({ theme }) => theme.tabletPortrait`
    padding-right: 20px;
  `};
`

const AboutTextSecondPart = styled.div`
  ${({ theme }) => theme.tabletPortrait`
    grid-column: 1 / span 2;
  `};
`

const AboutPic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  // Credit goes to Mattia Astorina's brilliant codepen for this effect

  background-color: #ecf2ff;
  height: 230px;
  max-width: 270px;
  min-width: 200px;
  background: radial-gradient(
    farthest-corner at 80px 80px,
    #f7f8fc 30%,
    #deecfb 70%,
    #f6e5fd 100%
  );
  animation: morph 30s ease-in-out infinite both alternate,
    translation 20s ease-in-out infinite both alternate;

  @keyframes morph {
    0%,
    100% {
      border-radius: 28% 72% 43% 57% / 24% 72% 28% 76%;
    }
    20% {
      border-radius: 59% 41% 66% 34% / 69% 54% 46% 31%;
    }
    40% {
      border-radius: 56% 44% 43% 57% / 32% 78% 22% 68%;
    }
    60% {
      border-radius: 61% 39% 32% 68% / 69% 71% 29% 31%;
    }
    80% {
      border-radius: 77% 23% 44% 56% / 81% 59% 41% 19%;
    }
    90% {
      border-radius: 38% 62% 44% 56% / 26% 59% 41% 74%;
    }
  }

  @keyframes translation {
    0%,
    100% {
      transform: none;
    }
    25% {
      transform: translateY(-1%) rotate(-10deg) scale(1.05);
    }
    50% {
      transform: translateY(6%) rotate(5deg, 10deg) scale(0.9);
    }
  }

  order: 5;
  margin-top: ${({ theme }) => theme.spacing["10"]};
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.tabletPortrait`
    order: initial;
    margin-top: 0;
  `};
`

const InfoSeparator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[300]};
  margin: 5px 0;

  ${({ theme }) => theme.tabletPortrait`
    grid-column: 1 / span 2;
  `};
`

const Info = styled.div`
  ${({ theme }) => theme.tabletPortrait`
    grid-column: 1 / span 2;
  `};
`

const InfoUL = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing["2"]};
`

const InfoLI = styled.li`
  margin-right: ${({ theme }) => theme.spacing["6"]};
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.thefuck};
  display: inline-block;
`

const Icon = styled.div`
  height: 13px;
  width: 13px;
  margin-right: 6px;

  .icon {
    fill: ${({ theme }) => theme.colors.gray[600]};
  }
`

const AboutLink = styled.a.attrs({
  target: "_blank",
  rel: "noreferrer noopener",
})`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[600]};

  :hover {
    color: ${({ theme }) => theme.colors.gray[400]};
    .icon {
      fill: ${({ theme }) => theme.colors.gray[400]};
    }
  }
`

export default ({ location }) => {
  useEffect(() => {
    console.log("Rendered")
  })

  return (
    <Layout location={location}>
      <SEO title="About" />
      <AboutContainer>
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
            I was born in South Korea, and lived in the Netherlands and Singapore
            for a while before moving to London for my undergraduate education.
          </P>
        </AboutTextFirstPart>
        <AboutPic></AboutPic>
        <AboutTextSecondPart>
          <P>
            I'm passionate about the intersection between technology and
            human-centric design. To me, programming represents a tool for
            translation, mediating the translation of ideas to reality and, by
            extension, our subjective experiences. Gaining mastery of a
            programming language is thus akin to gaining creative freedom —
            freedom to make any ideas come alive. How empowering!
          </P>
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
        <InfoSeparator />
        <Info>
          <InfoUL>
            <InfoLI>
              <AboutLink href="resume.pdf">
                <Icon as={FileIcon} />
                RESUME
              </AboutLink>
            </InfoLI>
            <InfoLI>
              <AboutLink href="https://github.com/sarckk">
                <Icon as={GithubIcon} />
                GITHUB
              </AboutLink>
            </InfoLI>
            <InfoLI>
              <AboutLink href="https://www.linkedin.com/in/yong-hoon-shin-592bba194/">
                <Icon as={LinkedInIcon} />
                LINKEDIN
              </AboutLink>
            </InfoLI>
          </InfoUL>
        </Info>
      </AboutContainer>
    </Layout>
  )
}
