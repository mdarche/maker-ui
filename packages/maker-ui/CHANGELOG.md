# maker-ui

## 2.0.1

### Patch Changes

- [#90](https://github.com/mdarche/maker-ui/pull/90) [`1556f261`](https://github.com/mdarche/maker-ui/commit/1556f261c86559e9d4b64e33984b09d824c00656) Thanks [@mdarche](https://github.com/mdarche)! - Update bundle issue and link libraries to latest v2 release

- Updated dependencies [[`1556f261`](https://github.com/mdarche/maker-ui/commit/1556f261c86559e9d4b64e33984b09d824c00656)]:
  - @maker-ui/layout@2.0.1
  - @maker-ui/accordion@2.0.1
  - @maker-ui/carousel@2.0.1
  - @maker-ui/forms@2.0.1
  - @maker-ui/hooks@2.0.1
  - @maker-ui/lightbox@2.0.1
  - @maker-ui/modal@2.0.1
  - @maker-ui/notifications@2.0.1
  - @maker-ui/popovers@2.0.1
  - @maker-ui/social@2.0.1
  - @maker-ui/spinners@2.0.1
  - @maker-ui/style@2.0.1
  - @maker-ui/tabs@2.0.1
  - @maker-ui/transition@2.0.1
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
  - @maker-ui/accordion@2.0.0
  - @maker-ui/carousel@2.0.0
  - @maker-ui/forms@2.0.0
  - @maker-ui/hooks@2.0.0
  - @maker-ui/lightbox@2.0.0
  - @maker-ui/modal@2.0.0
  - @maker-ui/notifications@2.0.0
  - @maker-ui/popovers@2.0.0
  - @maker-ui/social@2.0.0
  - @maker-ui/spinners@2.0.0
  - @maker-ui/style@2.0.0
  - @maker-ui/tabs@2.0.0
  - @maker-ui/transition@2.0.0
  - @maker-ui/utils@2.0.0

## 1.2.5

### Patch Changes

- Updated dependencies [[`0feec1b9`](https://github.com/mdarche/maker-ui/commit/0feec1b92b5a2100b0d365e18d8c68d1974a7d16)]:
  - @maker-ui/layout@1.2.5
  - @maker-ui/css@1.2.5
  - @maker-ui/utils@1.2.5
  - @maker-ui/primitives@1.2.5

## 1.2.4

### Patch Changes

- Updated dependencies [[`00da7da5`](https://github.com/mdarche/maker-ui/commit/00da7da5b26bd2bcb42ddbebb81b35fe9545c3f7)]:
  - @maker-ui/layout@1.2.4
  - @maker-ui/css@1.2.4
  - @maker-ui/utils@1.2.4
  - @maker-ui/primitives@1.2.4

## 1.2.3

### Patch Changes

- Updated dependencies [[`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488), [`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488)]:
  - @maker-ui/primitives@1.2.3
  - @maker-ui/css@1.2.3
  - @maker-ui/layout@1.2.3
  - @maker-ui/utils@1.2.3

## 1.2.2

### Patch Changes

- [#71](https://github.com/mdarche/maker-ui/pull/71) [`ccf46c28`](https://github.com/mdarche/maker-ui/commit/ccf46c28e765c8aee76ace7107640af9b13f65f9) Thanks [@mdarche](https://github.com/mdarche)! - Fix build workflow and publish script

- Updated dependencies [[`ccf46c28`](https://github.com/mdarche/maker-ui/commit/ccf46c28e765c8aee76ace7107640af9b13f65f9)]:
  - @maker-ui/css@1.2.2
  - @maker-ui/layout@1.2.2
  - @maker-ui/primitives@1.2.2
  - @maker-ui/utils@1.2.2

## 1.2.1

### Patch Changes

- Updated dependencies [[`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3), [`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3)]:
  - @maker-ui/utils@1.2.1
  - @maker-ui/css@1.2.1
  - @maker-ui/layout@1.2.1
  - @maker-ui/primitives@1.2.1

## 1.2.0

### Patch Changes

- Updated dependencies [[`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d), [`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d)]:
  - @maker-ui/utils@1.2.0
  - @maker-ui/css@1.2.0
  - @maker-ui/layout@1.2.0
  - @maker-ui/primitives@1.2.0
