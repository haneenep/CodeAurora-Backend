import { ParameterType } from "@/domain/entities";

export function generateCppBoilerplate(
  functionName: string,
  parameters: ParameterType[],
  returnType: string,
  returnElementType?: string,
  returnNestedType?: string
): string {
  function mapCppType(type: string): string {
    switch (type) {
      case "Integer":
        return "int";
      case "Float":
        return "double";
      case "String":
        return "string";
      case "Boolean":
        return "bool";
      case "Array":
        return "vector<int>";
      default:
        return "auto";
    }
  }

  const paramList = parameters
    .map((p) => {
      let typeStr = "";

      if (p.type === "Array") {
        if (returnElementType === "Array" && returnNestedType) {
          typeStr = `vector<vector<${mapCppType(returnNestedType)}>>`;
        } else if (returnElementType) {
          typeStr = `vector<${mapCppType(returnElementType)}>`;
        } else {
          typeStr = "vector<int>";
        }
      } else {
        switch (p.type) {
          case "Integer":
            typeStr = "int";
            break;
          case "Float":
            typeStr = "double";
            break;
          case "String":
            typeStr = "string";
            break;
          case "Boolean":
            typeStr = "bool";
            break;
          default:
            typeStr = "auto";
        }
      }

      return `${typeStr} ${p.name}`;
    })
    .join(", ");

  let cppReturnType = mapCppType(returnType);
  if (returnType === "Array") {
    if (returnElementType === "Array" && returnNestedType) {
      cppReturnType = `vector<vector<${mapCppType(returnNestedType)}>>`;
    } else if (returnElementType) {
      cppReturnType = `vector<${mapCppType(returnElementType)}>`;
    } else {
      cppReturnType = "vector<int>";
    }
  }

  return `#include <vector>
#include <string>
using namespace std;

${cppReturnType} ${functionName}(${paramList}) {
    // Your code here
}`;
}
