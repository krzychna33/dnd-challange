import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { DamageType } from '../domain/damage-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterDamageRequestDto {
  @ApiProperty({ enum: DamageType })
  @IsEnum(DamageType)
  @IsString()
  type: DamageType;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  value: number;
}
