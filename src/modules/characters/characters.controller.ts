import { Body, Controller, Param, Post } from '@nestjs/common';
import { CharacterNameParamDto } from './dto/character-name.param.dto';
import { CharacterDamageRequestDto } from './dto/character-damage.request.dto';
import { CharactersService } from './characters.service';
import { CharacterMapper } from './db/character.mapper';
import { plainToInstance } from 'class-transformer';
import { CharacterResponseDto } from './dto/character.response.dto';
import { CharacterHealthRequestDto } from './dto/character-health.request.dto';
import { CharacterAddTemporaryHpRequestDto } from './dto/character-add-temporary-hp.request.dto';

@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly characterMapper: CharacterMapper,
  ) {}
  @Post('/:name/damage')
  async handleDamage(
    @Param() { name }: CharacterNameParamDto,
    @Body() dto: CharacterDamageRequestDto,
  ) {
    const character = await this.charactersService.handleDamage(name, dto);
    return plainToInstance(CharacterResponseDto, {
      id: character.id,
      ...character.getProps(),
    });
  }

  @Post('/:name/health')
  async handleHealth(
    @Param() { name }: CharacterNameParamDto,
    @Body() dto: CharacterHealthRequestDto,
  ) {
    const character = await this.charactersService.handleHealth(name, dto);
    return plainToInstance(CharacterResponseDto, {
      id: character.id,
      ...character.getProps(),
    });
  }

  @Post('/:name/temporary-hp')
  async handleTemporaryHp(
    @Param() { name }: CharacterNameParamDto,
    @Body() dto: CharacterAddTemporaryHpRequestDto,
  ) {
    const character = await this.charactersService.handleAddTemporaryHp(
      name,
      dto,
    );
    return plainToInstance(CharacterResponseDto, {
      id: character.id,
      ...character.getProps(),
    });
  }
}
