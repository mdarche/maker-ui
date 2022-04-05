module.exports = {
  plugins: ['prettier', 'react-hooks'],
  extends: ['react-app'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-hooks/exhaustive-deps': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  ignorePatterns: ['packages/dist/*', 'dist/*'],
}
