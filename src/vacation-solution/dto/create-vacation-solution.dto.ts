import { PartialType } from "@nestjs/mapped-types";
import { CreateVacationSolutionDto } from "./update-vacation-solution.dto";

export class UpdateVacationSolutionDto extends PartialType(
  CreateVacationSolutionDto
) {}
