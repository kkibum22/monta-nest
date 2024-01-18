import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEggDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  required_study_time: number;

  @IsNumber()
  @IsOptional()
  purchase_price: number;

  @IsString()
  @IsOptional()
  image_url: string;

  @IsString()
  @IsOptional()
  grade: string;
}
