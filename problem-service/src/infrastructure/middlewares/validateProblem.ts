// infrastructure/http/middleware/validateProblem.ts
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const VALID_DIFFICULTIES = ["easy", "medium", "hard"];
const VALID_DATA_TYPES = ["Integer", "Floating Point", "String", "Boolean", "Array"];
const VALID_LANGUAGES = ["javascript", "python", "java", "cpp", "c"];

export const validateProblem = [
  body("problemNo")
    .isInt({ min: 1 })
    .withMessage("Problem number must be a positive integer"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 10, max: 100 })
    .withMessage("Title must be between 10 and 100 characters"),

  body("difficulty")
    .isIn(VALID_DIFFICULTIES)
    .withMessage("Difficulty must be one of: easy, medium, hard"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 50, max: 2000 })
    .withMessage("Description must be between 50 and 2000 characters"),

  body("functionName")
    .trim()
    .notEmpty()
    .withMessage("Function name is required")
    .matches(/^[a-z][a-zA-Z]*$/)
    .withMessage("Function name must be in camelCase")
    .isLength({ max: 30 })
    .withMessage("Function name must not exceed 30 characters"),

  body("returnType")
    .isIn(VALID_DATA_TYPES)
    .withMessage("Return type must be one of: Integer, Floating Point, String, Boolean, Array"),
  body("returnElementType")
    .if(body("returnType").equals("Array"))
    .isIn(VALID_DATA_TYPES)
    .withMessage("Element type must be one of: Integer, Floating Point, String, Boolean, Array")
    .notEmpty()
    .withMessage("Element type is required for Array return type"),
  body("returnNestedType")
    .if(body("returnElementType").equals("Array"))
    .isIn(["Integer", "Floating Point", "String", "Boolean"])
    .withMessage("Nested type must be one of: Integer, Floating Point, String, Boolean")
    .notEmpty()
    .withMessage("Nested type is required for nested Array return type"),

  body("parameters")
    .isArray({ min: 1 })
    .withMessage("At least one parameter is required"),
  body("parameters.*.name")
    .trim()
    .notEmpty()
    .withMessage("Parameter name is required")
    .isLength({ max: 30 })
    .withMessage("Parameter name must not exceed 30 characters"),
  body("parameters.*.type")
    .isIn(VALID_DATA_TYPES)
    .withMessage("Parameter type must be one of: Integer, Floating Point, String, Boolean, Array"),
  body("parameters.*.elemType")
    .if(body("parameters.*.type").equals("Array"))
    .isIn(VALID_DATA_TYPES)
    .withMessage("Element type must be one of: Integer, Floating Point, String, Boolean, Array")
    .notEmpty()
    .withMessage("Element type is required for Array parameter"),
  body("parameters.*.nestedType")
    .if(body("parameters.*.elemType").equals("Array"))
    .isIn(["Integer", "Floating Point", "String", "Boolean"])
    .withMessage("Nested type must be one of: Integer, Floating Point, String, Boolean")
    .notEmpty()
    .withMessage("Nested type is required for nested Array parameter"),

  body("examples")
    .isArray({ min: 1 })
    .withMessage("At least one example is required"),
  body("examples.*.input")
    .isArray({ min: 1 })
    .withMessage("Example input must have at least one parameter-value pair"),
  body("examples.*.input.*.parameter")
    .trim()
    .notEmpty()
    .withMessage("Example input parameter name is required"),
  body("examples.*.input.*.value")
    .trim()
    .notEmpty()
    .withMessage("Example input value is required"),
  body("examples.*.output")
    .trim()
    .notEmpty()
    .withMessage("Example output is required"),
  body("examples.*.explanation")
    .trim()
    .notEmpty()
    .withMessage("Example explanation is required"),

  body("testCases")
    .isArray({ min: 1 })
    .withMessage("At least one test case is required"),
  body("testCases.*.input")
    .isArray({ min: 1 })
    .withMessage("Test case input must have at least one parameter-value pair"),
  body("testCases.*.input.*.parameter")
    .trim()
    .notEmpty()
    .withMessage("Test case input parameter name is required"),
  body("testCases.*.input.*.value")
    .trim()
    .notEmpty()
    .withMessage("Test case input value is required"),
  body("testCases.*.output")
    .trim()
    .notEmpty()
    .withMessage("Test case output is required"),
  body("testCases.*.explanation")
    .trim()
    .notEmpty()
    .withMessage("Test case explanation is required"),

  body("supportedLanguages")
    .isArray({ min: 1 })
    .withMessage("At least one supported language is required"),
  body("supportedLanguages.*")
    .isIn(VALID_LANGUAGES)
    .withMessage("Supported language must be one of: javascript, python, java, cpp, c"),

  body("evalFunction")
    .trim()
    .notEmpty()
    .withMessage("Evaluation function is required")
    .isLength({ min: 10 })
    .withMessage("Evaluation function must be at least 10 characters long"),

  // Error handling middleware
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array().map((e) => `${e.type}: ${e.msg}`).join("; "),
      });
      return;
    }
    next();
  },
];