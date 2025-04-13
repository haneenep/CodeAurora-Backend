import { ProblemEntity, TestCase } from "@/domain/entities";
import { ITestCaseGenerator } from "@/domain/interfaces";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config";

class TestCaseGenerator implements ITestCaseGenerator {
  private genAi: GoogleGenerativeAI;

  constructor() {
    const apiKey = env.GEMINI_API_KEY;
    this.genAi = new GoogleGenerativeAI(apiKey);
  }
  
  async generateTestCases(
    problem: ProblemEntity,
    count: number
  ): Promise<TestCase[]> {
    const model = this.genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = this.buildPrompt(problem, count);

    try {

      const result = await model.generateContent(prompt);
      const rawOutput = result.response.text();

      const jsonMatch = rawOutput.match(/```json\n([\s\S]*?)\n```/);
      
      const jsonOutput = jsonMatch ? jsonMatch[1] : rawOutput;
      return JSON.parse(jsonOutput) as TestCase[];
    } catch (error) {
      console.error("Gemini ai error", error);
      throw new Error("Failed to generate test cases from gemini ai");
    }
  }

  private buildPrompt(problem: ProblemEntity, count: number): string {
    const { title, description, functionName, parameters, returnType, returnElementType, returnNestedType } = problem;
    const paramList = parameters.map(p => {
      if (p.type === "Array") {
        if (p.elementType === "Array" && p.nestedType) {
          return `${p.name}: Array<Array<${p.nestedType}>>`;
        }
        if (p.elementType) {
          return `${p.name}: Array<${p.elementType}>`;
        }
      }
      return `${p.name}: ${p.type}`;
    }).join(", ");

    let returnTypeStr: string = returnType;
    if (returnType === "Array") {
      if (returnElementType === "Array" && returnNestedType) {
        returnTypeStr = `Array<Array<${returnNestedType}>>`;
      } else if (returnElementType) {
        returnTypeStr = `Array<${returnElementType}>`;
      }
    }

    return `Generate ${count} test cases for a coding problem titled "${title}".
      Description: "${description}"
      Function: ${functionName}(${paramList}): ${returnTypeStr}
      Constraints: Assume reasonable ranges for parameters (e.g., integers between -100 and 100 unless specified).
      Format the output as a JSON array of objects with:
      - "input" (array of {parameter, value} pairs where value is a string),
      - "output" (string),
      - "explanation" (string describing why this test case is useful or what it tests).
      Include edge cases where applicable.
      For Array inputs/outputs, use valid JSON string notation (e.g., "[1, 2, 3]" or "[[1, 2], [3, 4]]").
      Wrap the JSON output in \`\`\`json\\n and \\n\`\`\` markers.`
  }
}

export default new TestCaseGenerator();
