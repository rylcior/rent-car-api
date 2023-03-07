import { IsOptional, IsString } from 'class-validator';

export class UpdateOfficeDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  city?: string;
  @IsString()
  @IsOptional()
  country?: string;
  @IsString()
  @IsOptional()
  streetAddress?: string;
  @IsString()
  @IsOptional()
  zipCode?: string;
}
