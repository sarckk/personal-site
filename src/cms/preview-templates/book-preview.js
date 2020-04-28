import React from "react"
import { BookReviewTemplate } from "../../templates/book-review"

export const BookPreviewTemplate = ({ entry, widgetFor, getAsset }) => {
  const body = widgetFor("body") && widgetFor("body").props.value

  return (
    <BookReviewTemplate
      title={entry.getIn(["data", "title"])}
      authors={entry.getIn(["data", "authors"])}
      body={body}
      summary={entry.getIn(["data", "summary"])}
      isPreview={true}
    />
  )
}
