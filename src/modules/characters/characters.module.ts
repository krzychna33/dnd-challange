import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharacterRepository } from './db/character.repository';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { CharacterSchema } from './db/character.schema';
import { CharacterMapper } from './db/character.mapper';
import { CharactersController } from './characters.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CharacterSchema.name,
        schema: SchemaFactory.createForClass(CharacterSchema),
      },
    ]),
  ],
  providers: [CharactersService, CharacterRepository, CharacterMapper],
  controllers: [CharactersController],
})
export class CharactersModule {}
