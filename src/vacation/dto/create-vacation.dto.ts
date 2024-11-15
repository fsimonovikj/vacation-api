import { IsNotEmpty, IsOptional } from "class-validator";
import { VacationType } from "../types/vacation-type";

export class CreateVacationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  days: number;

  @IsOptional()
  startAt: Date;

  @IsOptional()
  endAt: Date;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  planId: any;

  @IsNotEmpty()
  type: VacationType;
}
