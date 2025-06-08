import { HttpStatus, Messages } from "../../constants";
import { ProblemEntity } from "@/domain/entities";
import { IProblemRepository } from "@/domain/interfaces";
import { createHttpError } from "../../utils/httpError";
import { generateBoilerplate } from "../../utils/boilerplate/boilerplate.service";

export class AddProblemUseCase {
  constructor(private problemRepository: IProblemRepository) {}

  async execute(data: ProblemEntity): Promise<ProblemEntity> {
    const existingProblem = await this.problemRepository.findProblemByTitle(
      data.title
    );

    if (existingProblem) {
      throw createHttpError(HttpStatus.CONFLICT, Messages.TITLE_EXIST);
    }

    const boilerplateCodes = data.supportedLanguages.map((language) => ({
      language,
      code: generateBoilerplate(
        language,
        data.functionName,
        data.parameters,
        data.returnType,
        data.returnElementType,
        data.returnNestedType
      ),
    }));

    console.log(boilerplateCodes, "generated boilerplate codes");

    const problemWithBoilerplate: ProblemEntity = {
      ...data,
      boilerplateCodes
    }

    const createdProblem = await this.problemRepository.addProblem(problemWithBoilerplate);

    if (!createdProblem) {
      throw createHttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        Messages.PROBLEM_CREATION_FAILED
      );
    }
    return createdProblem;
  }
}
