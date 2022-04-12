# @maker-ui/forms

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
