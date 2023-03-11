import { IsNumber, IsString } from 'class-validator';
export class CreateCarDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;
  @IsString()
  model: string;

  @IsString()
  plates: string;

  @IsNumber()
  officeId: number;
}
