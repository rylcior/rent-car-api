import { IsString, IsOptional, IsNumber } from 'class-validator';
export class UpdateCarDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brand?: string;
  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  plates?: string;

  @IsNumber()
  @IsOptional()
  officeId?: number;
}
