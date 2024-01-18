import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEggDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  required_study_time: number;

  @IsNumber()
  @IsNotEmpty()
  purchase_price: number;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  grade: string;
}
