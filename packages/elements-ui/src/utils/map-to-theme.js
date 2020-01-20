import merge from "deepmerge"

import defaultOptions from "./default-options"

const validate = obj =>
  obj !== undefined && typeof obj === "object" ? obj : {}

export default (theme, options = defaultOptions) => {
  const elementsTheme = {
    sizes: {
      maxWidth_header: options.header.maxWidth,
      maxWidth_topbar: options.topbar.maxWidth,
      maxWidth_content: options.content.maxWidth,
      maxWidth_footer: options.footer.maxWidth,
      width_mobileNav: options.header.mobileNavWidth,
      width_sidebar: options.sidebar.width,
      width_sideNav: options.sideNav.width,
    },
    breakpoints: [
      options.breakpoints.sm,
      options.breakpoints.md,
      options.breakpoints.lg,
    ],
  }

  return merge(validate(theme), elementsTheme)
}
