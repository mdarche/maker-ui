module.exports = {
  plugins: ['prettier', 'react-hooks'],
  extends: ['react-app'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    'no-unused-vars': ['error', { varsIgnorePattern: 'field' }],
  },
  ignorePatterns: ['packages/dist/*', 'dist/*'],
}
