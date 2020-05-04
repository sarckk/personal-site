import React, { useEffect } from "react"
import Avatar from "../components/avatar"
import styled from "styled-components"
import HomeLayout from "../components/layouts/home-layout"
import { throttle } from "lodash"
import { Link } from "gatsby"

const Heading = styled.div`
  font-size: min(max(35px, 4vw), 50px);
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-top: ${({ theme }) => theme.spacing["7"]};
  margin-bottom: ${({ theme }) => theme.spacing["0"]};
  font-family: ${({ theme }) => theme.font.alternateSerif};
`

const HomeNavContainer = styled.div`
  display: flex;
`

const HomeLink = styled(Link)`
  margin-right: ${({ theme }) => theme.spacing["2"]};
  margin-left: ${({ theme }) => theme.spacing["2"]};
  transition all 0.3s ease;
  font-size: min(max(20px, 4vw), 25px);
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-family: ${({ theme }) => theme.font.alternateSerif};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    color: ${({ theme }) => theme.colors.gray[600]};
  }
`

const HomeNav = () => (
  <HomeNavContainer>
    <HomeLink to="/about">about</HomeLink>
    <HomeLink to="/work">work</HomeLink>
    <HomeLink to="/blog">blog</HomeLink>
    <HomeLink to="/books">books</HomeLink>
  </HomeNavContainer>
)

export default () => {
  useEffect(() => {
    if (window && !window.matchMedia("(min-width: 992px)").matches) {
      return
    }

    const maxLeftTranslationAdjustment = -20
    const maxRightTranslationAdjustment = 20
    const maxUpTranslationAdjustment = -5
    const maxDownTranslationAdjustment = 30

    function moveEyes(e) {
      const leftEyeCoords = document
        .getElementById("leftEye")
        .getBoundingClientRect()

      const rightEyeCoords = document
        .getElementById("rightEye")
        .getBoundingClientRect()

      const eyeBalls = document.getElementById("eyeballs")
      const eyeBallCoords = eyeBalls.getBoundingClientRect()

      let translateXVal = 0
      let translateYVal = 0

      // bind X coordinates of eyeballs to within eyes
      if (e.clientX < leftEyeCoords.left) {
        translateXVal =
          -(eyeBallCoords.left - leftEyeCoords.left) +
          maxLeftTranslationAdjustment
      } else if (
        e.clientX >= leftEyeCoords.left &&
        e.clientX <= eyeBallCoords.right
      ) {
        translateXVal = Math.min(-(eyeBallCoords.left - e.clientX), 0)
      } else if (
        e.clientX > eyeBallCoords.right &&
        e.clientX <= rightEyeCoords.right
      ) {
        translateXVal = e.clientX - eyeBallCoords.right
      } else {
        // e.clientX is bigger than rightEyecoords.right
        translateXVal =
          rightEyeCoords.right -
          eyeBallCoords.right +
          maxRightTranslationAdjustment
      }

      if (e.clientY < leftEyeCoords.top) {
        translateYVal += maxUpTranslationAdjustment // translate eyeballs 5 units up to 'look up' -> min y-value
      } else if (e.clientY <= leftEyeCoords.bottom) {
        translateYVal = e.clientY - eyeBallCoords.bottom || 0
      } else {
        // e.clientY is bigger than leftEyecoords.bottom
        translateYVal =
          leftEyeCoords.bottom -
          eyeBallCoords.bottom +
          maxDownTranslationAdjustment
      }

      eyeBalls.setAttribute(
        "transform",
        `translate(${translateXVal},${translateYVal})`
      )
    }

    const throttledMoveEyes = throttle(moveEyes, 20)

    window.addEventListener("mousemove", throttledMoveEyes)

    return () => window.removeEventListener("mousemove", throttledMoveEyes)
  }, [])

  return (
    <HomeLayout>
      <Avatar />
      <Heading>yong hoon shin</Heading>
      <HomeNav />
    </HomeLayout>
  )
}
