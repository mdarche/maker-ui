# @maker-ui/social

## 2.2.0

### Minor Changes

- [#121](https://github.com/mdarche/maker-ui/pull/121) [`bbd22d9b`](https://github.com/mdarche/maker-ui/commit/bbd22d9b548c769f546830dee868c95faeacfcfe) Thanks [@mdarche](https://github.com/mdarche)! - Removes twitter support and adds X icon

### Patch Changes

- [#121](https://github.com/mdarche/maker-ui/pull/121) [`bbd22d9b`](https://github.com/mdarche/maker-ui/commit/bbd22d9b548c769f546830dee868c95faeacfcfe) Thanks [@mdarche](https://github.com/mdarche)! - Adds peer dependency support for Next 14

- Updated dependencies [[`bbd22d9b`](https://github.com/mdarche/maker-ui/commit/bbd22d9b548c769f546830dee868c95faeacfcfe)]:
  - @maker-ui/utils@2.1.1
  - @maker-ui/style@2.1.1

## 2.1.0

### Minor Changes

- [#119](https://github.com/mdarche/maker-ui/pull/119) [`4462ada2`](https://github.com/mdarche/maker-ui/commit/4462ada255636e1e06197ea31ed3a3556d0c9d67) Thanks [@mdarche](https://github.com/mdarche)! - Simplify component API design and improve performance for SSR environments. Move dynamic styles to CSS variables. See [Pull Reqest #119](https://github.com/mdarche/maker-ui/pull/119) for more details.

### Patch Changes

- Updated dependencies [[`4462ada2`](https://github.com/mdarche/maker-ui/commit/4462ada255636e1e06197ea31ed3a3556d0c9d67)]:
  - @maker-ui/style@2.1.0
  - @maker-ui/utils@2.1.0

## 2.0.2

### Patch Changes

- [#99](https://github.com/mdarche/maker-ui/pull/99) [`7880debd`](https://github.com/mdarche/maker-ui/commit/7880debdec34bf350bc397cd3e14863f0da896a5) Thanks [@mdarche](https://github.com/mdarche)! - Allows `SocialAccounts` to accept null, undefined, or empty string values without throwing an error.

## 2.0.1

### Patch Changes

- [#90](https://github.com/mdarche/maker-ui/pull/90) [`1556f261`](https://github.com/mdarche/maker-ui/commit/1556f261c86559e9d4b64e33984b09d824c00656) Thanks [@mdarche](https://github.com/mdarche)! - Update bundle issue and link libraries to latest v2 release

- Updated dependencies [[`1556f261`](https://github.com/mdarche/maker-ui/commit/1556f261c86559e9d4b64e33984b09d824c00656)]:
  - @maker-ui/style@2.0.1
  - @maker-ui/utils@2.0.1

## 2.0.0

### Major Changes

- [#86](https://github.com/mdarche/maker-ui/pull/86) [`bb206ca3`](https://github.com/mdarche/maker-ui/commit/bb206ca3f9e7bc643ddb694a3b390e0945054a72) Thanks [@mdarche](https://github.com/mdarche)! - ### Major V2 Rewrite

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

### Patch Changes

- Updated dependencies [[`bb206ca3`](https://github.com/mdarche/maker-ui/commit/bb206ca3f9e7bc643ddb694a3b390e0945054a72)]:
  - @maker-ui/style@2.0.0
  - @maker-ui/utils@2.0.0

## 1.3.2

### Patch Changes

- Updated dependencies []:
  - @maker-ui/primitives@1.2.5

## 1.3.1

### Patch Changes

- Updated dependencies []:
  - @maker-ui/primitives@1.2.4

## 1.3.0

### Minor Changes

- [#75](https://github.com/mdarche/maker-ui/pull/75) [`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488) Thanks [@mdarche](https://github.com/mdarche)! - Initial release. `SocialAccounts` component that supports:

  - Discord
  - Twitter
  - Facebook
  - LinkedIn
  - Instagram
  - TikTok
  - Website
  - Youtube

### Patch Changes

- Updated dependencies [[`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488)]:
  - @maker-ui/primitives@1.2.3
