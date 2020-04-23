import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

// theme settings from tailwind-full.config in tailwindcss/designing-with-tailwindcss
export const theme = {
  font: {
    serif: "Charter, serif",
    sans: "aktiv-grotesk, sans-serif",
    alternateSerif: "skolar-latin, serif",
  },
  fontSize: {
    xxs: "0.6rem",
    xs: "0.75rem",
    sm: "0.95rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
  fontWeight: {
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  colors: {
    transparent: "transparent",

    black: "#191919",
    white: "#fff",

    gray: {
      100: "#f7fafc",
      200: "#edf2f7",
      300: "#e2e8f0",
      400: "#cbd5e0",
      500: "#a0aec0",
      600: "#718096",
      700: "#4a5568",
      800: "#2d3748",
      900: "#1a202c",
    },

    anchorColor: "#3370FC",
    anchorHover: "#4F8DFC",
    selectionFontColor: "#ECEDEF",
    selectionBGColor: "#575757",
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  spacing: {
    px: "1px",
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
    "40": "10rem",
    "48": "12rem",
    "56": "14rem",
    "64": "16rem",
  },
  boxShadow: {
    postPreview: "0px 3px 17px -2px rgba(222, 222, 222, 0.8)",
    postPreviewHover: "0px 6px 17px 3px rgba(222, 222, 222, 0.8)",
  },
}

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    scroll-behavior: smooth;
    color: ${({ theme }) => theme.colors.black}; 
    font-family: ${({ theme }) => theme.font.serif}; 
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    line-height: ${({ theme }) => theme.lineHeight.normal};
    letter-spacing: ${({ theme }) => theme.letterSpacing.normal};
    margin: 0;
  }  

  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper{
    height: 100%;
    width: 100%;
  }

  em{
    // too lazy to create separate component for this
    font-style: italic;
  }

  sup{
    vertical-align: super;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  strong{
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }

  table{
    margin:${({ theme }) => theme.spacing["0"]} 0 ${({ theme }) =>
  theme.spacing["8"]} 0;
  }

  td, th{
   padding: 0.5rem; 
   text-align: left;
  }

  tr:nth-child(even){
    background-color:${({ theme }) => theme.colors.gray[100]};
  }

  th{
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.fontSize.lg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  }

  td{
    font-size: ${({ theme }) => theme.fontSize.base};
  }

  ::selection{
     background: ${({ theme }) => theme.colors.selectionBGColor}; 
     color: ${({ theme }) => theme.colors.selectionFontColor};
  }

  ::-moz-selection{
     background: ${({ theme }) => theme.colors.selectionBGColor}; 
     color: ${({ theme }) => theme.colors.selectionFontColor};
  }

  h1,h2,h3,h4,h5,h6{
    font-family: ${({ theme }) => theme.font.sans};
  }

  // styling for div rendered by PrismJS
  .gatsby-highlight{
    margin: ${({ theme }) => theme.spacing["4"]}; 0;
    overflow: auto;

    pre {
     border-radius: ${({ theme }) => theme.spacing["2"]}; 
    }
  }
`
