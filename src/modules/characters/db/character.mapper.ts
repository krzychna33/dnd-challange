import { CharacterSchema } from './character.schema';
import { Character } from '../domain/Character';
import { ObjectId } from 'mongodb';
import { EntityMapper } from '../../../libs/ddd/entity-mapper.interface';
import { DamageType } from '../domain/damage-type.enum';
import { DefenseSkill } from '../domain/defense-skill.enum';

export class CharacterMapper
  implements EntityMapper<CharacterSchema, Character>
{
  toEntity(entitySchema: CharacterSchema): Character {
    return new Character({
      id: entitySchema._id.toString(),
      props: {
        name: entitySchema.name,
        level: entitySchema.level,
        hitPoints: entitySchema.hitPoints,
        defenses: entitySchema.defenses.map((defense) => {
          return {
            type: defense.type as DamageType,
            defense: defense.defense as DefenseSkill,
          };
        }),
        temporaryHitPoints: entitySchema.temporaryHitPoints,
      },
    });
  }

  toSchema(entity: Character): CharacterSchema {
    const props = entity.getProps();

    return {
      _id: new ObjectId(props.id),
      name: props.name,
      level: props.level,
      hitPoints: props.hitPoints,
      defenses: props.defenses,
      temporaryHitPoints: props.temporaryHitPoints,
    };
  }
}
