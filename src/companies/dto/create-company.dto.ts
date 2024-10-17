import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from "class-validator";

export class CreateCompanyDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsArray()
  @IsOptional()
  domains: string[];

  @IsBoolean()
  @IsOptional()
  isActivated: boolean;

  @IsOptional()
  @MaxLength(255)
  notes: string;
}
