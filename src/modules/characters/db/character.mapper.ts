import { CharacterSchema } from './character.schema';
import { Character, CharacterDefenseDefense } from '../domain/Character';
import { ObjectId } from 'mongodb';
import { EntityMapper } from '../../../libs/ddd/entity-mapper.interface';
import { plainToInstance } from 'class-transformer';
import { CharacterResponseDto } from '../dto/character.response.dto';

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
            type: defense.type,
            defense: defense.defense as CharacterDefenseDefense,
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
