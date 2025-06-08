import { ParameterType } from "@/domain/entities";

export function generatePythonBoilerplate(
  functionName: string,
  parameters: ParameterType[],
  returnType: string,
  returnElementType?: string,
  returnNestedType?: string
): string {
  const typeImports = new Set<string>();
  const paramList = parameters
    .map((p) => {
      const hint = mapPythonType(p.type, p.elementType, p.nestedType);
      if (hint.includes("List")) typeImports.add("List");
      if (hint.includes("Any")) typeImports.add("Any");
      return `${p.name}: ${hint}`;
    })
    .join(", ");

  const returnHint = mapPythonType(returnType, returnElementType, returnNestedType);
  if (returnHint.includes("List")) typeImports.add("List");
  if (returnHint.includes("Any")) typeImports.add("Any");

  const docParams = parameters.map((p) => `:param ${p.name}:`).join("\n    ");
  const docReturn = `:return: ${returnType.toLowerCase()} result`;

  const importLine = typeImports.size > 0 ? `from typing import ${[...typeImports].join(", ")}` : "";

  return `${importLine}

def ${functionName}(${paramList}) -> ${returnHint}:
    \"\"\"
    ${docParams}
    ${docReturn}
    \"\"\"
    # Your code here
    pass`;

  function mapPythonType(
    type: string,
    elementType?: string,
    nestedType?: string
  ): string {
    switch (type) {
      case "Integer":
        return "int";
      case "Float":
        return "float";
      case "String":
        return "str";
      case "Boolean":
        return "bool";
      case "Array":
        if (elementType === "Array" && nestedType) {
          return `List[List<${mapPythonType(nestedType)}>]`;
        }
        if (elementType) {
          return `List<${mapPythonType(elementType)}>`;
        }
        return "List[Any]";
      default:
        return "Any";
    }
  }
}
