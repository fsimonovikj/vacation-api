import { PartialType } from "@nestjs/mapped-types";
import { CreateVacationPlanDto } from "./update-vacation-plan.dto";

export class UpdateVacationPlanDto extends PartialType(CreateVacationPlanDto) {}
