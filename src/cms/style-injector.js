import React, { useLayoutEffect, useRef } from "react"
import { StyleSheetManager, ThemeProvider } from "styled-components"
import { GlobalStyle, theme } from "../theme/global-style"

const StyleSheetInjector = ({ children }) => {
  const iframeRef = useRef(null)

  useLayoutEffect(() => {
    const iframe = document.querySelector("#nc-root iframe")
    const iframeHead = iframe.contentDocument.head
    iframeRef.current = iframeHead
  })

  if (iframeRef && iframeRef.current) {
    return (
      <ThemeProvider theme={theme}>
        <StyleSheetManager target={iframeRef.current}>
          <>
            <GlobalStyle />
            {children}
          </>
        </StyleSheetManager>
      </ThemeProvider>
    )
  }

  return <div>Nothing to show</div>
}

export default StyleSheetInjector
