import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProbabilityDto {
  @IsString()
  @IsOptional()
  egg_grade: string;

  @IsString()
  @IsOptional()
  character_grade: string;

  @IsNumber()
  @IsOptional()
  odds: number;
}
