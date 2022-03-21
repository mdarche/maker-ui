module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    '@next/next/no-img-element': 'off',
  },
  settings: {
    next: {
      rootDir: 'apps/docs/',
    },
  },
}
