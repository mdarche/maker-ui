# @maker-ui/forms

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
