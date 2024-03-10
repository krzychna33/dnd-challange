import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CharacterNameParamDto {
  @ApiProperty()
  @IsString()
  name: string;
}
