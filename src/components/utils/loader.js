import React, { useRef, useEffect } from "react"
import styled from "styled-components"

const PulseLoadIndicator = styled.div`
  // CSS for pulse spinner from tobiasahlin/SpinKit

  width: 30px;
  height: 30px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray[400]};
  border-radius: 100%;
  animation: pulse 1s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);

  @keyframes pulse {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`

const LoaderDiv = styled.div`
  width: 100%;
  height: 30px;
`

export const Loader = ({ onVisible }) => {
  const loader = useRef(null)

  useEffect(() => {
    const config = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }

    const intersectionCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => onVisible(), 500)
        }
      })
    }

    const observer = new IntersectionObserver(intersectionCallback, config)

    if (loader && loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect()
  }, [onVisible])

  return (
    <LoaderDiv ref={loader}>
      <PulseLoadIndicator />
    </LoaderDiv>
  )
}
