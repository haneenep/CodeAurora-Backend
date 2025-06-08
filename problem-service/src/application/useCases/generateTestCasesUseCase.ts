import { ProblemEntity, TestCase } from "@/domain/entities";
import { ITestCaseGenerator } from "@/domain/interfaces";



export class GenerateTestCasesUseCase {
    constructor(private testCaseGenerator: ITestCaseGenerator){}
    async execute(problem: ProblemEntity, count: number): Promise<TestCase[]> {
        return await this.testCaseGenerator.generateTestCases(problem,count);
    }

}