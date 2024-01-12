import { IsNumber, IsString } from 'class-validator';

export class UpdateProbabilityDto {
  @IsString()
  egg_grade: string;

  @IsString()
  character_grade: string;

  @IsNumber()
  odds: number;
}
