# E2E Application

This demo app is meant to test all Maker UI components in a realistic Next.js environment.

This app is not designed for testing each and every component prop -- we handle that directly inside each package. The E2E gives us confidence that all components are rendering without errors and functioning with basic props.

## Getting Started

1. In the project root, first run `yarn build` to initiate a turbo build process.

2. Next run `yarn start` so that all previously built packages can be built in watch mode.

3. Run `yarn workspace e2e dev` to begin the Next.js development environment.

4. Finally, before pushing changes to the remote, run `yarn workspace e2e build` and `yarn workspace e2e start` to test the production build locally.

## Integration Testing

See `cypress/integration` for all relevant spec files.
