# @maker-ui/forms

## 2.0.1

### Patch Changes

- [#88](https://github.com/mdarche/maker-ui/pull/88) [`843c2487`](https://github.com/mdarche/maker-ui/commit/843c24871009fd53dff9557276042e01fcd7bcf7) Thanks [@mdarche](https://github.com/mdarche)! - Update bundle issue and link libraries to latest v2 release

- Updated dependencies [[`843c2487`](https://github.com/mdarche/maker-ui/commit/843c24871009fd53dff9557276042e01fcd7bcf7)]:
  - @maker-ui/spinners@2.0.1
  - @maker-ui/style@2.0.1
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
  - @maker-ui/spinners@2.0.0
  - @maker-ui/style@2.0.0
  - @maker-ui/transition@2.0.0
  - @maker-ui/utils@2.0.0

## 1.4.3

### Patch Changes

- Updated dependencies []:
  - @maker-ui/css@1.2.5
  - @maker-ui/utils@1.2.5
  - @maker-ui/primitives@1.2.5
  - @maker-ui/transition@1.2.5
  - @maker-ui/loaders@1.2.5

## 1.4.2

### Patch Changes

- [#80](https://github.com/mdarche/maker-ui/pull/80) [`00da7da5`](https://github.com/mdarche/maker-ui/commit/00da7da5b26bd2bcb42ddbebb81b35fe9545c3f7) Thanks [@mdarche](https://github.com/mdarche)! - - Prevent `returnUrl` image picker attribute from being rendered to DOM

- Updated dependencies []:
  - @maker-ui/css@1.2.4
  - @maker-ui/utils@1.2.4
  - @maker-ui/primitives@1.2.4
  - @maker-ui/transition@1.2.4
  - @maker-ui/loaders@1.2.4

## 1.4.1

### Patch Changes

- [#77](https://github.com/mdarche/maker-ui/pull/77) [`7428bfb0`](https://github.com/mdarche/maker-ui/commit/7428bfb0147fc80a3199459f5baed2ba682fabba) Thanks [@mdarche](https://github.com/mdarche)! - Fix `returnUrl` setting bug

## 1.4.0

### Minor Changes

- [#75](https://github.com/mdarche/maker-ui/pull/75) [`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488) Thanks [@mdarche](https://github.com/mdarche)! - Form, Field and Provider updates:

  - Map initialValues for Select field to React Select defaultValues prop
  - Improve form and field validation strategies
  - Optionally pass local image URL to form value for image-picker field
  - Add `columnGap` and `rowGap` props to Form grid
  - Fix sortChildren utility function
  - Add support for custom Remove Image button content
  - Add ReactElement type support to description (`FieldProp`)

### Patch Changes

- Updated dependencies [[`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488), [`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488), [`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488)]:
  - @maker-ui/primitives@1.2.3
  - @maker-ui/css@1.2.3
  - @maker-ui/transition@1.2.3
  - @maker-ui/loaders@1.2.3
  - @maker-ui/utils@1.2.3

## 1.3.0

### Minor Changes

- [#73](https://github.com/mdarche/maker-ui/pull/73) [`ae578077`](https://github.com/mdarche/maker-ui/commit/ae578077c0ba58000d06f43c6094e8cda6ebfe10) Thanks [@mdarche](https://github.com/mdarche)! - - Fix placeholder bug
  - Fix switch initial toggle bug
  - Add conditional field prop and 5 comparison operators
  - Update sortChilden function

## 1.2.2

### Patch Changes

- [#71](https://github.com/mdarche/maker-ui/pull/71) [`ccf46c28`](https://github.com/mdarche/maker-ui/commit/ccf46c28e765c8aee76ace7107640af9b13f65f9) Thanks [@mdarche](https://github.com/mdarche)! - Fix build workflow and publish script

- Updated dependencies [[`ccf46c28`](https://github.com/mdarche/maker-ui/commit/ccf46c28e765c8aee76ace7107640af9b13f65f9)]:
  - @maker-ui/css@1.2.2
  - @maker-ui/loaders@1.2.2
  - @maker-ui/primitives@1.2.2
  - @maker-ui/transition@1.2.2
  - @maker-ui/utils@1.2.2

## 1.2.1

### Patch Changes

- [#66](https://github.com/mdarche/maker-ui/pull/66) [`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3) Thanks [@mdarche](https://github.com/mdarche)! - Add react-select for select and multi-select inputs
  Add autosave form and field settings
  Add @maker-ui/loaders and @maker-ui/transition as dependencies
  Use @maker-ui/transition to dynamically reveal Form.Success component
  Refactor Formik field connections
  Combine radio and checkbox components into shared architecture
  Add password toggle to Input field
  Set default input ID to name for label accessibility
  Move all supplemental Form imports to new FormElements.tsx file
  Render all FormElements according to `sortChildren` function
- Updated dependencies [[`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3), [`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3), [`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3), [`ccfb069e`](https://github.com/mdarche/maker-ui/commit/ccfb069e0fd1fd40b61514b62dd959269886b3e3)]:
  - @maker-ui/loaders@1.2.1
  - @maker-ui/utils@1.2.1
  - @maker-ui/css@1.2.1
  - @maker-ui/transition@1.2.1
  - @maker-ui/primitives@1.2.1

## 1.2.0

### Minor Changes

- [#60](https://github.com/mdarche/maker-ui/pull/60) [`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d) Thanks [@mdarche](https://github.com/mdarche)! - Add ImagePicker component as a single export and a field type
  Replace `FieldProps['settings']` prop with conditional types based on the current `FieldType`
  Add `disableSubmit` setting to FormProvider.

### Patch Changes

- Updated dependencies [[`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d), [`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d)]:
  - @maker-ui/utils@1.2.0
  - @maker-ui/css@1.2.0
  - @maker-ui/primitives@1.2.0
