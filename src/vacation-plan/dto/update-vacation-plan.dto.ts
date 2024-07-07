import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateVacationPlanDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  start: string;

  @IsOptional()
  end: string;
}
