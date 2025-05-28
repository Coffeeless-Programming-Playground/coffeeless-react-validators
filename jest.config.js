module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts,tsx)',
    '!**/*d.ts'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@errors/(.*)$': '<rootDir>/src/errors/$1',
    '@protocols/(.*)$': '<rootDir>/src/protocols/$1',
    '@validators/(.*)$': '<rootDir>/src/validators/$1',
  },
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}