import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**"],
  coverageReporters: ["text"],
  coverageThreshold: {
    global: {
      lines: 90
    }
  }
};

export default jestConfig;
