import { Types } from "mongoose";


export type DifficultyType = "easy" | "medium" | "hard";

export type DataTypes = "Array" | "Integer" | "Float" | "String" | "Boolean";

export type StatusType = "listed" | "unListed"

export type Languages = "javascript" | "python" | "java" | "cpp" | "c"

export interface ParameterType {
    name: string;
    type: DataTypes;
    elementType?: DataTypes;
    nestedType?: DataTypes;
}

interface Input {
    parameter: string;
    value: string;
}

export interface Example {
    input: Input[];
    output: string;
    explanation?: string;
}

export interface TestCase {
    input: Input[];
    output: string;
    explanation?: string;
}

export interface BoilerplateType {
    language: Languages;
    code: string;
}


export interface ProblemEntity {
    _id?: Types.ObjectId;
    problemNo: number;
    title: string;
    difficulty: DifficultyType;
    description: string;
    functionName: string;
    returnType: DataTypes;
    returnElementType?: DataTypes;
    returnNestedType?: Exclude<DataTypes, "Array">;
    parameters: ParameterType[];
    examples: Example[];
    testCases: TestCase[];
    boilerplateCodes?: BoilerplateType[];
    supportedLanguages: Languages[];
    evalFunction: string;
    status?: StatusType;
    createdAt?: Date;
    updatedAt?: Date;
}