import { IsArray, IsInt, IsNotEmpty, IsString, Max, Min, ArrayMinSize } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsArray()
  @ArrayMinSize(4)
  options!: string[];

  @IsInt()
  @Min(0)
  @Max(3)
  correctAnswer!: number;
}