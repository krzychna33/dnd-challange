import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterAddTemporaryHpRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  value: number;
}
