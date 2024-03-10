import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterHealthRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  value: number;
}
