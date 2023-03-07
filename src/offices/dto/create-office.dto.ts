import { IsString } from 'class-validator';

export class CreateOfficeDto {
  @IsString()
  name: string;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsString()
  streetAddress: string;
  @IsString()
  zipCode: string;
}
