import { NextFunction, Request, Response } from "express";


export interface IProblemController {
    addProblem(req: Request, res: Response, next: NextFunction): Promise<void>;
    generateTestCases(req: Request, res: Response, next: NextFunction): Promise<void>;
}