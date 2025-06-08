import express from "express";
import { ProblemController } from "../controller/implementation";
import { AddProblemUseCase, GenerateTestCasesUseCase } from "../../application/useCases";
import problemRespositories from "../../infrastructure/mongoose/repositories/problemRespositories";
import TestCaseGenerator  from "../../infrastructure/ai/testCaseGenerator";
import { validateProblem } from "../../infrastructure/middlewares";

const problemRouter = express.Router();

const addProblemUseCase = new AddProblemUseCase(problemRespositories)
const generateTestCaseUseCase = new GenerateTestCasesUseCase(TestCaseGenerator)

const problemController = new ProblemController(
addProblemUseCase,
generateTestCaseUseCase
)


problemRouter.post('/add-problem', validateProblem, problemController.addProblem.bind(problemController))
problemRouter.post('/generate-test-cases',problemController.generateTestCases.bind(problemController))


export default problemRouter;