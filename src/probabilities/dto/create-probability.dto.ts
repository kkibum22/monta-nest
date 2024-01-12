import { IsNumber, IsString } from 'class-validator';

export class CreateProbabilityDto {
  @IsString()
  egg_grade: string;

  @IsString()
  character_grade: string;

  @IsNumber()
  odds: number;
}
