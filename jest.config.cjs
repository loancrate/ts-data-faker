/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.c?js$": "$1",
  },
  preset: "ts-jest/presets/default-esm",
  rootDir: "src",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "../coverage",
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
