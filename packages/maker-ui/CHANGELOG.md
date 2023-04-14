# maker-ui

## 2.0.8

### Patch Changes

- Updated dependencies [[`be80956b`](https://github.com/mdarche/maker-ui/commit/be80956bdacca7fab33ebf221ca79fd6d6334cae)]:
  - @maker-ui/forms@2.0.8

## 2.0.7

### Patch Changes

- Updated dependencies [[`e29bd270`](https://github.com/mdarche/maker-ui/commit/e29bd2708a5eac34f836ed27d5ae516c34bbd195)]:
  - @maker-ui/forms@2.0.7

## 2.0.6

### Patch Changes

- Updated dependencies [[`0cb2e500`](https://github.com/mdarche/maker-ui/commit/0cb2e500ec52e6af4b3cf0bbc50844fb45a92301)]:
  - @maker-ui/forms@2.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [[`7880debd`](https://github.com/mdarche/maker-ui/commit/7880debdec34bf350bc397cd3e14863f0da896a5), [`7880debd`](https://github.com/mdarche/maker-ui/commit/7880debdec34bf350bc397cd3e14863f0da896a5), [`7880debd`](https://github.com/mdarche/maker-ui/commit/7880debdec34bf350bc397cd3e14863f0da896a5), [`7880debd`](https://github.com/mdarche/maker-ui/commit/7880debdec34bf350bc397cd3e14863f0da896a5)]:
  - @maker-ui/social@2.0.2
  - @maker-ui/notifications@2.0.4
  - @maker-ui/layout@2.0.2
  - @maker-ui/forms@2.0.5

## 2.0.4

### Patch Changes

- [#97](https://github.com/mdarche/maker-ui/pull/97) [`897b5bae`](https://github.com/mdarche/maker-ui/commit/897b5baeb15310330f435dcbea5466e5245ba6f6) Thanks [@mdarche](https://github.com/mdarche)! - Improves the overall developer experience of @maker-ui/forms:

  - Adds required symbol support
  - Adds access to custom success and page transitions
  - Fixes various form styles and labels
  - Adds previous `className` to form progress indicator
  - Enables page titles
  - Applies column classes to groups
  - Applies conditional logic to groups
  - Removes `divider` type from form schema
  - Exports `TransitionType` from `@maker-ui/transitions`
  - Fixes broken `radio` and `checkbox` field types
  - Exports new `findDifferences` and `createUpdateObject` as submit helpers

- Updated dependencies [[`897b5bae`](https://github.com/mdarche/maker-ui/commit/897b5baeb15310330f435dcbea5466e5245ba6f6)]:
  - @maker-ui/forms@2.0.4
  - @maker-ui/transition@2.0.2
  - @maker-ui/lightbox@2.0.4
  - @maker-ui/modal@2.0.2
  - @maker-ui/notifications@2.0.3
  - @maker-ui/popovers@2.0.2
  - @maker-ui/spinners@2.0.2

## 2.0.3

### Patch Changes

- [#95](https://github.com/mdarche/maker-ui/pull/95) [`1a7b0544`](https://github.com/mdarche/maker-ui/commit/1a7b0544ba7e9a18cda9fd6c579b6de9806e8ee7) Thanks [@mdarche](https://github.com/mdarche)! - Summary of edits:

  - Fixed forms `resetForm` and `setIsSubmitting` helpers
  - Add honeypot field option to text inputs w/ styling
  - Updated styles for lightbox
  - Removed unused zoom code from lightbox
  - Added stylesheet to carousel and removed runtime style tag
  - Added overlay prop to carousel

- Updated dependencies [[`1a7b0544`](https://github.com/mdarche/maker-ui/commit/1a7b0544ba7e9a18cda9fd6c579b6de9806e8ee7)]:
  - @maker-ui/carousel@2.0.2
  - @maker-ui/forms@2.0.3
  - @maker-ui/lightbox@2.0.3

## 2.0.2

### Patch Changes

- [#92](https://github.com/mdarche/maker-ui/pull/92) [`e8aeb98c`](https://github.com/mdarche/maker-ui/commit/e8aeb98c5fea0e55fbfea43dc84e58a88a6fe0a3) Thanks [@mdarche](https://github.com/mdarche)! - Fixes include:

  - Next Image support in lightbox
  - CSS styles for toast provider
  - Better types for `forms` library
  - Fixed pagination bug in multi-page forms

- Updated dependencies [[`e8aeb98c`](https://github.com/mdarche/maker-ui/commit/e8aeb98c5fea0e55fbfea43dc84e58a88a6fe0a3)]:
  - @maker-ui/forms@2.0.2
  - @maker-ui/lightbox@2.0.2
  - @maker-ui/notifications@2.0.2

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
