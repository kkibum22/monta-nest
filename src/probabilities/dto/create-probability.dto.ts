import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProbabilityDto {
  @IsString()
  @IsNotEmpty()
  egg_grade: string;

  @IsString()
  @IsNotEmpty()
  character_grade: string;

  @IsNumber()
  @IsNotEmpty()
  odds: number;
}
