import { ParameterType } from "@/domain/entities";

export const generateJSBoilerplate = (
  functionName: string,
  parameters: ParameterType[],
  returnType: string,
  returnElementType?: string,
  returnNestedType?: string
): string => {
  const paramNames = parameters.map((p) => p.name).join(", ");

  function jsDocType(type: string, elementType?: string, nestedType?: string): string {
    if (type === "Array") {
      if (elementType === "Array" && nestedType) {
        return `Array<Array<${mapJSType(nestedType)}>>`;
      } else if (elementType) {
        return `Array<${mapJSType(elementType)}>`;
      } else {
        return `Array<any>`;
      }
    }
    return mapJSType(type);
  }

  function mapJSType(type: string): string {
    switch (type) {
      case "Integer":
      case "Floating Point":
        return "number";
      case "String":
        return "string";
      case "Boolean":
        return "boolean";
      case "Array":
        return "Array<any>";
      default:
        return "any";
    }
  }

  const jsDocParams = parameters
    .map((p) => {
      return `@param {${jsDocType(p.type, p.elementType, p.nestedType)}} ${p.name}`;
    })
    .join("\n * ");

  const jsDocReturn = `@return {${jsDocType(returnType, returnElementType, returnNestedType)}}`;

  return `/**
 * ${jsDocParams}
 * ${jsDocReturn}
 */
function ${functionName}(${paramNames}) {
  // Your code here
}
`;
};
