module.exports = {
  plugins: ['react-hooks'],
  extends: ['prettier', 'react-app', 'turbo'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-hooks/exhaustive-deps': 'error',
  },
  ignorePatterns: ['packages/dist/*', 'dist/*'],
}
