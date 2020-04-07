import React, { useEffect } from "react"
import Avatar from "../components/avatar"
import HomeNav from "../components/home_nav"
import styled from "styled-components"
import HomeLayout from "../components/layouts/home_layout"

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["5xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing["0"]};
`

export default () => {
  useEffect(() => {
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

    window.addEventListener("mousemove", moveEyes)

    return () => window.removeEventListener("mousemove", moveEyes)
  }, [])

  return (
    <HomeLayout>
      <Avatar />
      <Heading>yong hoon shin</Heading>
      <HomeNav />
    </HomeLayout>
  )
}
