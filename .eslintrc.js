module.exports = {
  plugins: ['prettier'],
  extends: ['react-app', 'plugin:prettier/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
