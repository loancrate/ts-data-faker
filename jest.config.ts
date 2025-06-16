import type { Config } from "jest";
import { createJsWithTsEsmPreset } from "ts-jest";

const presetConfig = createJsWithTsEsmPreset();

const config: Config = {
  ...presetConfig,
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

export default config;
