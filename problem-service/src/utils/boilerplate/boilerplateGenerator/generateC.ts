import { ParameterType } from "@/domain/entities";

export function generateCBoilerplate(
  functionName: string,
  parameters: ParameterType[],
  returnType: string,
  returnElementType?: string,
  returnNestedType?: string
): string {
  function mapCType(type: string): string {
    switch (type) {
      case "Integer":
        return "int";
      case "Floating Point":
        return "double";
      case "String":
        return "char*";
      case "Boolean":
        return "bool";
      case "Array":
        return "int*";
      default:
        return "void";
    }
  }

  const paramList = parameters
    .map((p) => {
      switch (p.type) {
        case "Array":
          const elementType = returnElementType
            ? mapCType(returnElementType)
            : "int";
          return `${elementType}* ${p.name}, int ${p.name}_size`;
        case "Integer":
          return `int ${p.name}`;
        case "Float":
          return `double ${p.name}`;
        case "String":
          return `char* ${p.name}`;
        case "Boolean":
          return `bool ${p.name}`;
        default:
          return `void* ${p.name}`;
      }
    })
    .join(", ");

  let cReturnType = mapCType(returnType);
  if (returnType === "Array") {
    if (returnElementType === "Array" && returnNestedType) {
      cReturnType = `${mapCType(returnNestedType)}**`;
    } else if (returnElementType) {
      cReturnType = `${mapCType(returnElementType)}*`;
    } else {
      cReturnType = "int*";
    }
  }

  return `#include <stdbool.h>

${cReturnType} ${functionName}(${paramList}) {
    // Your code here
}`;
}
