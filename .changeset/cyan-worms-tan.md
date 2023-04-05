---
'@maker-ui/accordion': major
'@maker-ui/build-tools': major
'@maker-ui/carousel': major
'@maker-ui/forms': major
'@maker-ui/generative': major
'@maker-ui/hooks': major
'@maker-ui/lightbox': major
'maker-ui': major
'@maker-ui/modal': major
'@maker-ui/notifications': major
'@maker-ui/popovers': major
'@maker-ui/scroll': major
'@maker-ui/social': major
'@maker-ui/spinners': major
'@maker-ui/style': major
'@maker-ui/tabs': major
'@maker-ui/toc': major
'@maker-ui/transition': major
'@maker-ui/utils': major
---

### Major V2 Rewrite

This release is the product of several months of rewrites and optimizations. Most notably, v2 removes all dependence on Emotion and Formik.

Maker UI is now focused on Next.js v13+ and React Server Components. All packages can be accessed from a single `maker-ui` library import and the new React 18 `use-client` directive is automatically included in each client bundle. When used with the Next13 `app` directory, all included libraries are tree shakeable.

Most APIs are similar to their v1.2.5 counterparts with a few key exceptions:

- `@maker-ui/layout` is comprised of two libraries, server and client.
- `@maker-ui/layout` can now be fully configured using `<Layout>` dot children or by accessing `MakerUIOptions`. No need to import multiple components.
- `@maker-ui/layout` and all supplemental packages now leverage CSS variables for styling. Now you can easily build a design system and style all components from static CSS files.
- `@maker-ui/forms` no longer exports Yup and instead supports Zod validation. It also includes a custom field implementations inspired by `react-select` and `react-datepicker` without the added bundle size.
- `@maker-ui/css` and `@maker-ui/primitives` are discontinued in favor of pure CSS styles that better leverage RSC.
- `@maker-ui/style` is a new library that recreates much of the core functionality we borrowed from Emotion. It is RSC compliant and supports responsive arrays / breakpoints props.
- `@maker-ui/gsap` is also discontinued.
- `@maker-ui/hooks` is now the central package for all reusable React hooks used throughout this library as well as some common, helpful utility hooks.
  = `@maker-ui` now ships stylesheets for any style-heavy component libraries like layout and forms.
