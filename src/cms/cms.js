import React from "react"
import CMS from "netlify-cms-app"
import { BlogPreviewTemplate } from "./preview-templates/blog-preview"
import StyleSheetInjector from "./style-injector"

CMS.registerPreviewTemplate("blog", props => (
  <StyleSheetInjector>
    <BlogPreviewTemplate {...props} />
  </StyleSheetInjector>
))
