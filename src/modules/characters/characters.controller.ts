import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CharacterNameParamDto } from './dto/character-name.param.dto';
import { CharacterDamageRequestDto } from './dto/character-damage.request.dto';
import { CharactersService } from './characters.service';
import { plainToInstance } from 'class-transformer';
import { CharacterResponseDto } from './dto/character.response.dto';
import { CharacterHealthRequestDto } from './dto/character-health.request.dto';
import { CharacterAddTemporaryHpRequestDto } from './dto/character-add-temporary-hp.request.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOkResponse({ type: CharacterResponseDto })
  @Get('/:name')
  async getCharacter(
    @Param() { name }: CharacterNameParamDto,
  ): Promise<CharacterResponseDto> {
    const character = await this.charactersService.getCharacter(name);
    return plainToInstance(CharacterResponseDto, {
      id: character.id,
      ...character.getProps(),
    });
  }

  @ApiOkResponse({ type: CharacterResponseDto })
  @Post('/:name/damage')
  async handleDamage(
    @Param() { name }: CharacterNameParamDto,
    @Body() dto: CharacterDamageRequestDto,
  ): Promise<CharacterResponseDto> {
    const character = await this.charactersService.handleDamage(name, dto);
    return plainToInstance(CharacterResponseDto, {
      id: character.id,
      ...character.getProps(),
    });
  }

  @ApiOkResponse({ type: CharacterResponseDto })
  @Post('/:name/health')
  async handleAddHealth(
    @Param() { name }: CharacterNameParamDto,
    @Body() dto: CharacterHealthRequestDto,
  ): Promise<CharacterResponseDto> {
    const character = await this.charactersService.handleAddHealth(name, dto);
    return plainToInstance(CharacterResponseDto, {
      id: character.id,
      ...character.getProps(),
    });
  }

  @ApiOkResponse({ type: CharacterResponseDto })
  @Post('/:name/temporary-hp')
  async handleAddTemporaryHp(
    @Param() { name }: CharacterNameParamDto,
    @Body() dto: CharacterAddTemporaryHpRequestDto,
  ): Promise<CharacterResponseDto> {
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
