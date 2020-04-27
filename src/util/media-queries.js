//Credit to Samuel Resua for the following implementation
import { css } from "styled-components"

const mediaSizes = {
  mobileLandscape: 480,
  tabletPortrait: 768,
  tabletLandscape: 992,
  laptop: 1200,
}

export default Object.keys(mediaSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${mediaSizes[label]}px) {
      ${css(...args)};
    }
  `

  return acc
}, {})
