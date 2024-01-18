import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudyCategoryDto {
  @IsString()
  @IsNotEmpty()
  subject: string;
}
