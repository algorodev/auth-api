module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ['lcov', 'text-summary'],
  coverageThreshold: {
    global : {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/test/utils/database.utils.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.{js,ts}'],
  transform: { '^.+\\.ts?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.prod.json' }] },
  verbose: true,
}
