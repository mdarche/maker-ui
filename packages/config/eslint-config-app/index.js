// For next.js apps
module.exports = {
  extends: ['next', 'prettier', 'turbo'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-img-element': 'off',
    'react/jsx-key': 'off',
  },
}
