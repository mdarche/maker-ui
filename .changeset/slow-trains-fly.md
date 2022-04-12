---
'@maker-ui/tabs': patch
---

Tab component bug fixes:

- Add `tabKeyNavigate` prop to override default a11y behavior of tab key
- Update tab state if title changes (support hot reload)
- Fix focus bug by adding array of refs to tab navigation
