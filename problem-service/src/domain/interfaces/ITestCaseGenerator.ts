import { ProblemEntity, TestCase } from "../entities";

export interface ITestCaseGenerator {
  generateTestCases(
    problem: ProblemEntity,
    count: number
  ): Promise<TestCase[]>;
}
