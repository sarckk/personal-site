import React from "react"
import { BlogTemplate } from "../../templates/blog-post"

const getUTCFormattedString = localDateString => {
  const dateObj = new Date(localDateString)
  const formattedUTCDateString = dateObj.toLocaleString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "2-digit",
    year: "numeric",
  })

  return formattedUTCDateString
}

export const BlogPreviewTemplate = ({ entry, widgetFor, getAsset }) => {
  const dateString = entry.getIn(["data", "date"])
  const postDate = dateString && getUTCFormattedString(dateString)
  console.log("postDate:", postDate)
  const body = widgetFor("body") && widgetFor("body").props.value
  const image = entry.getIn(["data", "featuredImage"])
  const featuredImage = getAsset(image).toString()

  return (
    <BlogTemplate
      title={entry.getIn(["data", "title"])}
      description={entry.getIn(["data", "description"])}
      date={postDate}
      featuredImage={featuredImage}
      body={body}
      isPreview={true}
    />
  )
}
