import { AddProblemUseCase } from "@/application/useCases";
import { NextFunction, Request, Response } from "express";
import { IProblemController } from "../interfaces";
import { ProblemEntity } from "@/domain/entities";
import { GenerateTestCasesUseCase } from "@/application/useCases/generateTestCasesUseCase";
import { HttpStatus, Messages } from "../../../constants";

export class ProblemController implements IProblemController {
  constructor(
    private addProblemUseCase: AddProblemUseCase,
    private generateTestCaseUseCase: GenerateTestCasesUseCase
  ) {}
  async addProblem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body, "b");
    try {
      const createdProblem = await this.addProblemUseCase.execute(req.body);
      res.status(HttpStatus.OK).json({
        success: true,
        message: Messages.PROBLEM_ADDED,
        data: createdProblem,
      });
    } catch (error) {
      next(error);
    }
  }

  async generateTestCases(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const problem: ProblemEntity = req.body;
      const count = parseInt(req.query.count as string);  

      const testCases = await this.generateTestCaseUseCase.execute(
        problem,
        count
      );

      res.status(HttpStatus.CREATED).json({
        message: Messages.TEST_CASE_ADDED,
        success: true,
        data: testCases,
      });

    } catch (error) {
      next(error);
    }
  }
}
