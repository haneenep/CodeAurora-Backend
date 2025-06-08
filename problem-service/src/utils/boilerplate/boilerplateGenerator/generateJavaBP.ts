import { ParameterType } from "@/domain/entities";

export function generateJavaBoilerplate(
  functionName: string,
  parameters: ParameterType[],
  returnType: string,
  returnElementType?: string,
  returnNestedType?: string
): string {
  function mapJavaType(type: string): string {
    switch (type) {
      case "Integer":
        return "int";
      case "Floating Point":
        return "double";
      case "String":
        return "String";
      case "Boolean":
        return "boolean";
      case "Array":
        return "Object[]";
      default:
        return "Object";
    }
  }

  const paramList = parameters
    .map((p) => {
      let typeStr = "";

      if (p.type === "Array") {
        if (returnElementType === "Array" && returnNestedType) {
          typeStr = `${mapJavaType(returnNestedType)}[][]`;
        } else if (returnElementType) {
          typeStr = `${mapJavaType(returnElementType)}[]`;
        } else {
          typeStr = "Object[]";
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
            typeStr = "String";
            break;
          case "Boolean":
            typeStr = "boolean";
            break;
          default:
            typeStr = "Object";
        }
      }

      return `${typeStr} ${p.name}`;
    })
    .join(", ");

  let javaReturnType = mapJavaType(returnType);
  if (returnType === "Array") {
    if (returnElementType === "Array" && returnNestedType) {
      javaReturnType = `${mapJavaType(returnNestedType)}[][]`;
    } else if (returnElementType) {
      javaReturnType = `${mapJavaType(returnElementType)}[]`;
    } else {
      javaReturnType = "Object[]";
    }
  }

  return `public class Solution {
    /**
     * ${parameters.map((p) => `@param ${p.name}`).join("\n     * ")}
     * @return ${returnType.toLowerCase()} result
     */
    public ${javaReturnType} ${functionName}(${paramList}) {
        // Your code here
    }
}`;
}
