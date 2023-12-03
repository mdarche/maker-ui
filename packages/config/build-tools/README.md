# @maker-ui/build-tools

## Overview

`@maker-ui/build-tools` is a local package designed to provide granular control over building individual packages within a development environment. Leveraging the power of `esbuild` and `tsup`, this package streamlines the configuration process for building TypeScript projects. It is intended to be included as a dev dependency in all packages within the project.

## Key Features

- **Granular Build Control**: Customize build settings for individual packages.
- **esbuild Integration**: Utilize the fast, efficient bundling provided by esbuild.
- **TypeScript Support**: Designed specifically for TypeScript projects, with `tsup` integration.
- **CSS Module Support**: Customizable handling of `.module.css` files, including optional global scoping and prefixing.

## Installation

As a dev dependency, `@maker-ui/build-tools` should be installed in each package where it will be used:

```bash
pnpm install @maker-ui/build-tools -D
```

## Usage

To use `@maker-ui/build-tools`, create a `tsup.config.ts` file at the root of your package and import the `buildConfig` function from `@maker-ui/build-tools`. Configure the build process as shown in the example below:

```typescript
import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

export default defineConfig((options) =>
  buildConfig({
    clean: false,
    minify: !options.watch,
    entry: {
      index: 'src/index.ts',
    },
    banner: {
      js: `'use client'`,
    },
  })
)
```

## Configuration

### Build Settings

`BuildSettings` is an interface extending `Options` from `tsup`, allowing additional configuration specific to `@maker-ui/build-tools`:

- `global`: Boolean. Determines if `.module.css` files will include scoped hashes at the end of the selector. Default is `false`.
- `prefix`: String. Adds a prefix to the CSS module after the root `mkui`.

### Default Settings

The package comes with default settings, which can be overridden in the `buildConfig` function:

- `entry`: Default entry point is set to `['src/index.ts']`.
- `format`: Formats set to `['esm', 'cjs']`.
- `external`: Default external modules include `['react']`.
- `dts`: Generates type declarations, set to true.
- `clean`: Controls whether to clean the dist folder before building. Default is false.

## Extending Build Configuration

To extend or override the default build configuration, pass additional properties to the `buildConfig` function. For example, to change the entry point or include additional formats, you can modify the configuration as needed.
