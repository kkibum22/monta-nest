import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudyCategoryDto {
  @IsString()
  @IsNotEmpty()
  subject: string;
}
