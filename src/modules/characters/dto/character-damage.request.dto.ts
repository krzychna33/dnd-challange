import { CharacterDamageType } from '../domain/Character';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export class CharacterDamageRequestDto {
  @IsEnum(Object.values(CharacterDamageType))
  type: CharacterDamageType;

  @IsNumber()
  @IsPositive()
  value: number;
}
