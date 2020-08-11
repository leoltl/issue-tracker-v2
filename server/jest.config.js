module.exports = {
  testMatch: [
    '**/*.spec.(js|jsx|ts|tsx)',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: [
    '<rootDir>/src',
  ],
  collectCoverageFrom: [
    '**/domain/**/*.ts',
  ],
}