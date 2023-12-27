import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**"],
  coverageReporters: ["html"],
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/services/"]
};

export default jestConfig;
