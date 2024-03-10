import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { DamageType } from '../domain/damage-type.enum';

export class CharacterDamageRequestDto {
  @IsEnum(Object.values(DamageType))
  @IsString()
  type: DamageType;

  @IsNumber()
  @IsPositive()
  value: number;
}
