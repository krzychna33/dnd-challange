import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../../libs/database/identifable-entity.schema';

@Schema({ versionKey: false, _id: false })
export class CharacterDefensesSchema {
  @Prop()
  type: string;

  @Prop()
  defense: string;
}

@Schema({ versionKey: false, collection: 'characters' })
export class CharacterSchema extends IdentifiableEntitySchema {
  @Prop({ unique: true })
  readonly name: string;

  @Prop()
  readonly level: number;

  @Prop()
  hitPoints: number;

  @Prop({ type: [CharacterDefensesSchema] })
  defenses: CharacterDefensesSchema[];

  @Prop()
  temporaryHitPoints: number;
}
