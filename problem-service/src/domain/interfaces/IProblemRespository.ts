import { ProblemEntity } from "../entities";



export interface IProblemRepository {
    addProblem(data: ProblemEntity): Promise<ProblemEntity | null>;
    findProblemByTitle(title: string): Promise<ProblemEntity | null>;
}