import { IsNotEmpty } from "class-validator";
import { VacationType } from "../../vacation/types/vacation-type";

export class CreateVacationPlanDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  start: Date;

  @IsNotEmpty()
  end: Date;

  @IsNotEmpty()
  days: number;

  @IsNotEmpty()
  type: VacationType;
}
