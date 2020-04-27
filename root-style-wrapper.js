import React from "react"
import { GlobalStyle, theme } from "./src/theme/global-style"
import { ThemeProvider } from "styled-components"

export const wrap = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
)
