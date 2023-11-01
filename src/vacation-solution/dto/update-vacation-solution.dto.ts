import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateVacationSolutionDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  start: string;

  @IsOptional()
  end: string;
}
