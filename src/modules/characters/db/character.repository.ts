import { Injectable } from '@nestjs/common';
import { RepositoryBase } from '../../../libs/database/repository.base';
import { CharacterSchema } from './character.schema';
import { Character } from '../domain/Character';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterMapper } from './character.mapper';
import { ObjectId } from 'mongodb';

@Injectable()
export class CharacterRepository extends RepositoryBase<
  CharacterSchema,
  Character
> {
  constructor(
    @InjectModel(CharacterSchema.name) characterModel: Model<CharacterSchema>,
    characterMapper: CharacterMapper,
  ) {
    super(characterModel, characterMapper);
  }

  findOneByName(name: string) {
    return this.findOne({ name });
  }

  async update(character: Character): Promise<Character> {
    await this.findOneAndReplace(
      { _id: new ObjectId(character.id) },
      character,
    );

    return character;
  }
}
