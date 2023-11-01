import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateVacationDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  days: number;

  @IsOptional()
  startAt: string;

  @IsOptional()
  endAt: string;

  @IsNotEmpty()
  userId: string;
}
