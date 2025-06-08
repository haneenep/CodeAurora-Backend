import { ProblemEntity } from "@/domain/entities";
import { IProblemRepository } from "@/domain/interfaces";
import problemModel from "../model/problemModel";

class ProblemRepository implements IProblemRepository {
  async addProblem(data: ProblemEntity): Promise<ProblemEntity | null> {
    try {
      const createProblem = await problemModel.create(data);
      console.log(createProblem.toObject() as ProblemEntity,"creeeeeeeeeeate")
      return createProblem.toObject() as ProblemEntity;
    } catch (error) {
      console.error(error);
      throw new Error("failed to create problem");
    }
  }

  async findProblemByTitle(title: string): Promise<ProblemEntity | null> {
    try {
      const findProblem = await problemModel.findOne({ title });
      console.log(findProblem?.toObject() as ProblemEntity,"prooooooooblem")
      return findProblem ? findProblem.toObject() as ProblemEntity : null;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find the problem exist or not");
    }
  }
}

export default new ProblemRepository();
