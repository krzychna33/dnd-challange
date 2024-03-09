import { IsNumber, IsPositive } from 'class-validator';

export class CharacterHealthRequestDto {
  @IsNumber()
  @IsPositive()
  value: number;
}
