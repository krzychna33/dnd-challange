import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CharacterResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  level: string;

  @Expose()
  hitPoints: string;

  @Expose()
  temporaryHitPoints: number;
}
