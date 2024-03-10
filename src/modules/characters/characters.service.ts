import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import * as brivCharacter from '../../../static/briv.json';
import { CharacterRepository } from './db/character.repository';
import { CharacterDamageRequestDto } from './dto/character-damage.request.dto';
import { Character } from './domain/Character';
import { CharacterHealthRequestDto } from './dto/character-health.request.dto';
import { CharacterAddTemporaryHpRequestDto } from './dto/character-add-temporary-hp.request.dto';
import { DamageType } from './domain/damage-type.enum';
import { DefenseSkill } from './domain/defense-skill.enum';

@Injectable()
export class CharactersService implements OnModuleInit {
  private readonly logger = new Logger(CharactersService.name);

  constructor(private readonly characterRepository: CharacterRepository) {}

  async onModuleInit(): Promise<any> {
    await this.loadDefaultCharacter();
  }

  async loadDefaultCharacter() {
    this.logger.log('Loading Default Character!');

    await this.characterRepository.deleteAll();

    const newCharacter = Character.create({
      name: brivCharacter.name,
      level: brivCharacter.level,
      hitPoints: brivCharacter.hitPoints,
      defenses: brivCharacter.defenses.map((defense) => {
        return {
          type: defense.type as DamageType,
          defense: defense.defense as DefenseSkill,
        };
      }),
    });

    await this.characterRepository.create(newCharacter);
  }

  async getCharacter(name: string): Promise<Character> {
    const character = await this.characterRepository.findOneByName(name);
    if (!character) {
      throw new NotFoundException();
    }

    return character;
  }

  async handleDamage(
    name: string,
    dto: CharacterDamageRequestDto,
  ): Promise<Character> {
    const character = await this.characterRepository.findOneByName(name);
    if (!character) {
      throw new NotFoundException();
    }

    character.takeDamage(dto.type, dto.value);

    await this.characterRepository.update(character);

    return character;
  }

  async handleAddHealth(
    name: string,
    dto: CharacterHealthRequestDto,
  ): Promise<Character> {
    const character = await this.characterRepository.findOneByName(name);
    if (!character) {
      throw new NotFoundException();
    }

    character.heal(dto.value);

    await this.characterRepository.update(character);

    return character;
  }

  async handleAddTemporaryHp(
    name: string,
    dto: CharacterAddTemporaryHpRequestDto,
  ): Promise<Character> {
    const character = await this.characterRepository.findOneByName(name);
    if (!character) {
      throw new NotFoundException();
    }

    character.addTemporaryHp(dto.value);

    await this.characterRepository.update(character);

    return character;
  }
}
