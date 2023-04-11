---
'@maker-ui/forms': patch
'maker-ui': patch
'@maker-ui/transition': patch
---

Improves the overall developer experience of @maker-ui/forms:

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
