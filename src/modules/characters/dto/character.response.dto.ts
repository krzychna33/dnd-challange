import { Exclude, Expose, Type } from 'class-transformer';
import { DamageType } from '../domain/damage-type.enum';
import { DefenseSkill } from '../domain/defense-skill.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterDefenseResponseDto {
  @ApiProperty({ enum: DamageType })
  @Expose()
  type: DamageType;

  @ApiProperty({ enum: DefenseSkill })
  @Expose()
  defense: DefenseSkill;
}

@Exclude()
export class CharacterResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  level: string;

  @ApiProperty()
  @Expose()
  hitPoints: string;

  @ApiProperty()
  @Expose()
  temporaryHitPoints: number;

  @ApiProperty({ type: CharacterDefenseResponseDto, isArray: true })
  @Expose()
  @Type(() => CharacterDefenseResponseDto)
  defenses: CharacterDefenseResponseDto[];
}
