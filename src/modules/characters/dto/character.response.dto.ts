import { Exclude, Expose, Type } from 'class-transformer';
import { DamageType } from '../domain/damage-type.enum';
import { DefenseSkill } from '../domain/defense-skill.enum';

export class CharacterDefenseResponseDto {
  @Expose()
  type: DamageType;

  @Expose()
  defense: DefenseSkill;
}

@Exclude()
export class CharacterResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  level: string;

  @Expose()
  hitPoints: string;

  @Expose()
  temporaryHitPoints: number;

  @Expose()
  @Type(() => CharacterDefenseResponseDto)
  defenses: CharacterDefenseResponseDto[];
}
