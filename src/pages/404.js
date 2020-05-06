import React, { useLayoutEffect, useState } from "react"
import Layout from "../components/layouts/layout"
import styled from "styled-components"
import SEO from "../components/seo"
import { Headings, StyledLink } from "../components/page-elements"

const RandomImage = styled.img`
  max-width: 250px;
  display: block;

  ${({ theme }) => theme.tabletPortrait`
   max-width: 400px;
  `};
`

const PageDesc = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};

  &:nth-last-of-type(3) {
  }
`

const RandomImageCaption = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-top: ${({ theme }) => theme.spacing["1"]};
  margin-bottom: ${({ theme }) => theme.spacing["6"]};
  font-family: ${({ theme }) => theme.font.sans};
`

export default () => {
  const [image, setImage] = useState(null)
  const [op, setOp] = useState(null)
  const [title, setTitle] = useState(null)

  useLayoutEffect(() => {
    if (window === undefined) {
      return
    }

    async function fetchImage() {
      const response = await fetch(
        "https://www.reddit.com/r/fakehistoryporn.json?sort=top&t=week&limit=50"
      )

      if (response.ok) {
        const posts = await response.json()
        const safePosts = posts.data.children.filter(post => !post.data.over_18)

        if (!safePosts.length) {
          console.log("No valid posts found")
          return
        }

        const randomChoice = Math.floor(Math.random() * safePosts.length)
        const data = safePosts[randomChoice].data
        console.log("data: ", data)

        if (!data.url) {
          console.log("Invalid post -- No image url found")
          return
        }

        setImage(data.url)
        setTitle(data.title)
        setOp(data.author)
      } else {
        console.warn("HTTP-ERROR: ", response.status)
      }
    }

    fetchImage()
  }, [])

  return (
    <Layout>
      <SEO title="Page not found" description="Page could not be found" />
      <Headings.SerifH1>Page not found</Headings.SerifH1>
      <PageDesc>
        Looks like the page you're searching for doesn't exist!
      </PageDesc>
      <PageDesc style={{ marginBottom: "20px" }}>
        To compensate for your lost time, here's a piece of history from{" "}
        <strong>r/fakehistoryporn</strong>:
      </PageDesc>
      {image && (
        <>
          <RandomImage src={image} />
          <RandomImageCaption>
            <strong>{title}</strong> by u/{op}
          </RandomImageCaption>
        </>
      )}
      <div>
        <StyledLink to="/">Go back to homepage</StyledLink>
      </div>
    </Layout>
  )
}
