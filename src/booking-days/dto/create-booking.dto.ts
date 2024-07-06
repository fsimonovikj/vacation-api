import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBookingDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  start: string;

  @IsOptional()
  end: string;

  @IsOptional()
  bookedDays: number;

  @IsOptional()
  status: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  vacationId: string;
}
