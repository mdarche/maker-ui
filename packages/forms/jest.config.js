module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'src',
    'node_modules',
    // add your PNPM workspace directories here
    'node_modules/.pnpm',
    'node_modules/.pnpm/@*/*/node_modules',
    'node_modules/.pnpm/registry.npmjs.org/*/*/node_modules',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        isolatedModules: true,
      },
    ],
    '^.+\\.(js|jsx)$': ['babel-jest'],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
}
