import React, { useEffect, useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const SiteTitle = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  z-index: 2;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.tabletPortrait`
    margin-right: auto;
  `};
`

export const ScrambleTitle = () => {
  const siteTitle = useRef(null)

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

 useEffect(() => {
    if (window && !window.matchMedia("(min-width: 992px)").matches) {
      return
    }
    console.log("SCRAMBLING....")
    // The following lines of code in this useEffect hook somehow makes the scramble animation work
    // I don't understand exactly why, but it does.
    const el = siteTitle.current
    const originalText = el.innerText.substr(0)
    const NUMBER_OF_REPLACES = 4
    const NUMBER_OF_SHUFFLES = 5
    const DELAY = 80
    const replacementChars =
      '!"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSUVWXYZ[]^_`abcdefghijklmnopqrsuvwxyz{|}~¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷░▒▓'

    const getRandomChar = () => {
      return replacementChars[
        Math.floor(Math.random() * replacementChars.length)
      ]
    }

    const replaceCharAt = (s, c, index) => {
      return s.substr(0, index) + c + s.substr(index + 1)
    }

    let frameRequest

    el.addEventListener("mouseover", () => {
      let replacements = []

      for (let i = 0; i < NUMBER_OF_REPLACES; i++) {
        replacements[i] = {
          indexToReplace: Math.floor(Math.random() * originalText.length),
          timesToComplete: Math.floor(Math.random() * NUMBER_OF_SHUFFLES) + 1,
          timesIterated: 0,
          iterateFinished: false,
        }
      }

      let completedScramble = 0

      const scramble = () => {
        let output = el.innerText

        replacements.forEach(object => {
          const {
            indexToReplace,
            timesToComplete,
            timesIterated,
            iterateFinished,
          } = object

          if (iterateFinished) {
            return
          }

          if (timesIterated === timesToComplete) {
            completedScramble++
            object.iterateFinished = true
          }

          if (Math.random() < 0.8) {
            output = replaceCharAt(output, getRandomChar(), indexToReplace)
            object.timesIterated = timesIterated + 1
          }
        })

        el.innerText = output

        if (completedScramble < NUMBER_OF_REPLACES) {
          new Promise(resolve => {
            setTimeout(() => {
              resolve()
            }, DELAY)
          }).then(() => {
            frameRequest = requestAnimationFrame(scramble)
          })
        } else {
          cancelAnimationFrame(frameRequest)
          el.innerText = originalText
        }
      }

      scramble()
    })

    el.addEventListener("mouseout", () => {
      cancelAnimationFrame(frameRequest)
      el.innerText = originalText
    })

    return () => {
      console.log("unmounted hover listener")
      cancelAnimationFrame(frameRequest)
      el.innerText = originalText
    }
  }, [])

  return (
    <SiteTitle ref={siteTitle} to="/">
      {data.site.siteMetadata.title}
    </SiteTitle>
  )
}
