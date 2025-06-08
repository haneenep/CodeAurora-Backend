import { ParameterType } from "@/domain/entities";
import {
  generateCBoilerplate,
  generateCppBoilerplate,
  generateJavaBoilerplate,
  generateJSBoilerplate,
  generatePythonBoilerplate,
} from "./boilerplateGenerator";

export const generateBoilerplate = (
  language: string,
  functionName: string,
  parameters: ParameterType[],
  returnType: string,
  returnElementType?: string,
  returnNestedType?: string
) => {
  switch (language) {
    case "javascript":
      return generateJSBoilerplate(
        functionName,
        parameters,
        returnType,
        returnElementType,
        returnNestedType
      );
    case "python":
      return generatePythonBoilerplate(
        functionName,
        parameters,
        returnType,
        returnElementType,
        returnNestedType
      );
    case "java":
      return generateJavaBoilerplate(
        functionName,
        parameters,
        returnType,
        returnElementType,
        returnNestedType
      );
    case "cpp":
      return generateCppBoilerplate(
        functionName,
        parameters,
        returnType,
        returnElementType,
        returnNestedType
      );
    case "c":
      return generateCBoilerplate(
        functionName,
        parameters,
        returnType,
        returnElementType,
        returnNestedType
      );
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};
