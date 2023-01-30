# @maker-ui/gsap

## 1.2.6

### Patch Changes

- [#84](https://github.com/mdarche/maker-ui/pull/84) [`0feec1b9`](https://github.com/mdarche/maker-ui/commit/0feec1b92b5a2100b0d365e18d8c68d1974a7d16) Thanks [@mdarche](https://github.com/mdarche)! - - Add slide template click handler and active index prop

- Updated dependencies [[`0feec1b9`](https://github.com/mdarche/maker-ui/commit/0feec1b92b5a2100b0d365e18d8c68d1974a7d16)]:
  - @maker-ui/layout@1.2.5
  - @maker-ui/css@1.2.5
  - @maker-ui/utils@1.2.5
  - @maker-ui/primitives@1.2.5

## 1.2.5

### Patch Changes

- [#82](https://github.com/mdarche/maker-ui/pull/82) [`08b9deb1`](https://github.com/mdarche/maker-ui/commit/08b9deb17b81559bdbff08ea3fa1b4fc81d48fe7) Thanks [@mdarche](https://github.com/mdarche)! - fix: remove carousel autoplay bug

## 1.2.4

### Patch Changes

- [#80](https://github.com/mdarche/maker-ui/pull/80) [`00da7da5`](https://github.com/mdarche/maker-ui/commit/00da7da5b26bd2bcb42ddbebb81b35fe9545c3f7) Thanks [@mdarche](https://github.com/mdarche)! - - Fix carousel arrow and dot props = false bug
  - Automatically supply the slide index to each slide as an `index` prop
  - Allow individual slides to disable drag gestures via `draggable` prop
  - Support displaying multiple carousel slides at once
- Updated dependencies [[`00da7da5`](https://github.com/mdarche/maker-ui/commit/00da7da5b26bd2bcb42ddbebb81b35fe9545c3f7)]:
  - @maker-ui/layout@1.2.4
  - @maker-ui/css@1.2.4
  - @maker-ui/utils@1.2.4
  - @maker-ui/primitives@1.2.4

## 1.2.3

### Patch Changes

- [#75](https://github.com/mdarche/maker-ui/pull/75) [`a9a04ac1`](https://github.com/mdarche/maker-ui/commit/a9a04ac119a558a98897544fa1121761fb3dd488) Thanks [@mdarche](https://github.com/mdarche)! - Patch updates to `Carousel` component:

  - Fix autoplay if external controls are not present

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

### Minor Changes

- [#60](https://github.com/mdarche/maker-ui/pull/60) [`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d) Thanks [@mdarche](https://github.com/mdarche)! - Create gsap library for common animation components like:

  - Parallax
  - ScrollReveal
  - Carousel

  Require gsap as peer dependency, not direct dependent.

### Patch Changes

- Updated dependencies [[`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d), [`4146651`](https://github.com/mdarche/maker-ui/commit/4146651ace370416da58af0e10d410b01354277d)]:
  - @maker-ui/utils@1.2.0
  - @maker-ui/css@1.2.0
  - @maker-ui/layout@1.2.0
  - @maker-ui/primitives@1.2.0