import { BoilerplateType, Example, ParameterType, ProblemEntity, TestCase } from "@/domain/entities";
import mongoose, { Schema } from "mongoose";

const TestCaseSchema: Schema<TestCase> = new Schema({
  input: [
    {
      parameter: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  output: { type: String, required: true },
  explanation: {
    type: String
  }
});

const ExampleSchema: Schema<Example> = new Schema({
  input: [
    {
      parameter: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  output: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});

const parameterSchema: Schema<ParameterType> = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Array", "Integer", "Floating Point", "String", "Boolean"],
  },
  // for array parameters
  elementType: {
    type: String,
    enum: ["Array", "Integer", "Floating Point", "String", "Boolean"],
  },
  // for nested arrays
  nestedType: {
    type: String,
    enum: ["Array", "Integer", "Floating Point", "String", "Boolean"],
  }
});

const BoilerplateSchema: Schema<BoilerplateType> = new Schema({
  language: {
    type: String,
    required: true,
    enum: ["javascript", "python", "java", "cpp", "c"],
  },
  code: {
    type: String,
    required: true,
  },
});

const problemSchema: Schema<ProblemEntity> = new mongoose.Schema(
  {
    problemNo: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    description: {
      type: String,
      required: true,
    },
    functionName: {
      type: String,
      required: true,
    },
    returnType: {
      type: String,
      required: true,
      enum: ["Array", "Integer", "Float", "String", "Boolean"],
    },
    parameters: [parameterSchema],
    returnElementType: {
      type: String,
      enum: ["Array", "Float", "Integer", "String", "Boolean"],
    },
    returnNestedType: {
      type: String,
      enum: ["Float", "Integer", "String", "Boolean"],
    },
    examples: [ExampleSchema],
    testCases: [TestCaseSchema],
    boilerplateCodes: [BoilerplateSchema],
    supportedLanguages: [
      {
        type: String,
        enum: ["javascript", "python", "java", "cpp", "c"],
      },
    ],
    evalFunction: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["listed", "unListed"],
      default: "unListed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("problem", problemSchema);
