# @maker-ui/spinners

## 2.0.1

### Patch Changes

- [#88](https://github.com/mdarche/maker-ui/pull/88) [`843c2487`](https://github.com/mdarche/maker-ui/commit/843c24871009fd53dff9557276042e01fcd7bcf7) Thanks [@mdarche](https://github.com/mdarche)! - Update bundle issue and link libraries to latest v2 release

- Updated dependencies [[`843c2487`](https://github.com/mdarche/maker-ui/commit/843c24871009fd53dff9557276042e01fcd7bcf7)]:
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
  - @maker-ui/transition@2.0.0
  - @maker-ui/utils@2.0.0

## 1.2.5

### Patch Changes

- Updated dependencies []:
  - @maker-ui/utils@1.2.5
  - @maker-ui/primitives@1.2.5
  - @maker-ui/transition@1.2.5

## 1.2.4

### Patch Changes

- Updated dependencies []:@
  - @maker-ui/utils@1.2.4
  - @maker-ui/primitives@1.2.4
  - @maker-ui/transition@1.2.4

## 1.2.3

### Patch Changes

- Updated dependencies [[`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488), [`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488)]:
  - @maker-ui/primitives@1.2.3
  - @maker-ui/transition@1.2.3
  - @maker-ui/utils@1.2.3

## 1.2.2

### Patch Changes

- [#71](https://github.com/mdarche/maker-ui/pull/71) [`ccf46c28`](https://github.com/mdarche/maker-ui/commit/ccf46c28e765c8aee76ace7107640af9b13f65f9) Thanks [@mdarche](https://github.com/mdarche)! - Fix build workflow and publish script

- Updated dependencies [[`ccf46c28`](https://github.com/mdarche/maker-ui/commit/ccf46c28e765c8aee76ace7107640af9b13f65f9)]:
  - @maker-ui/primitives@1.2.2
  - @maker-ui/transition@1.2.2
  - @maker-ui/utils@1.2.2

## 1.2.1

### Patch Changes

- [#66](https://github.com/mdarche/maker-ui/pull/66) [`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3) Thanks [@mdarche](https://github.com/mdarche)! - Break spinner components into separate files and simplify prop API
  Add bar and classic spinner designs
- Updated dependencies [[`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3), [`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3)]:
  - @maker-ui/utils@1.2.1
  - @maker-ui/transition@1.2.1
  - @maker-ui/primitives@1.2.1

## 1.2.0

### Minor Changes

- [#60](https://github.com/mdarche/maker-ui/pull/60) [`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d) Thanks [@mdarche](https://github.com/mdarche)! - Move loading spinners to separate package and remove from `@maker-ui/elements`

### Patch Changes

- Updated dependencies [[`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d)]:
  - @maker-ui/utils@1.2.0
  - @maker-ui/primitives@1.2.0
