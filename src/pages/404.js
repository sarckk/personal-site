import React, { useEffect, useState } from "react"
import Layout from "../components/layouts/layout"
import styled from "styled-components"
import SEO from "../components/seo"
import { Headings, StyledLink } from "../components/page-elements"

const RandomImage = styled.img`
  max-width: 250px;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing["6"]};

  ${({ theme }) => theme.tabletPortrait`
   max-width: 400px;
  `};
`

const PageDesc = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};

  &:nth-last-of-type(2) {
    margin-bottom: ${({ theme }) => theme.spacing["4"]};
  }
`

export default () => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (window === undefined) {
      return
    }

    async function fetchImage() {
      const response = await fetch(
        "https://www.reddit.com/r/hmmm.json?sort=top&t=week&limit=50"
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

        if (!data.url) {
          console.log("Invalid post -- No image url found")
          return
        }

        setImage(data.url)
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
      <PageDesc>
        To compensate for your lost time, here's a random picture from{" "}
        <strong>r/hmmm</strong>:
      </PageDesc>
      <RandomImage src={image} />
      <div>
        <StyledLink to="/">Go back to homepage</StyledLink>
      </div>
    </Layout>
  )
}
