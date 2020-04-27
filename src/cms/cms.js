import React from "react"
import CMS from "netlify-cms-app"
import { BlogPreviewTemplate, BookPreviewTemplate } from "./preview-templates"
import StyleSheetInjector from "./style-injector"

CMS.registerPreviewTemplate("blog", props => (
  <StyleSheetInjector>
    <BlogPreviewTemplate {...props} />
  </StyleSheetInjector>
))

CMS.registerPreviewTemplate("books", props => (
  <StyleSheetInjector>
    <BookPreviewTemplate {...props} />
  </StyleSheetInjector>
))
