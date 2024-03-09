import { IsNumber, IsPositive } from 'class-validator';

export class CharacterAddTemporaryHpRequestDto {
  @IsNumber()
  @IsPositive()
  value: number;
}
