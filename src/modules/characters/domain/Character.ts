import { AggregateRoot } from '../../../libs/ddd/aggregate-root.base';
import { AggregateID } from '../../../libs/ddd/entity.base';
import { ObjectId } from 'mongodb';

export enum CharacterDefenseDefense {
  IMMUNITY = 'immunity',
  RESISTANCE = 'resistance',
}

export type CharacterDefense = {
  type: string;
  defense: CharacterDefenseDefense;
};

export enum CharacterDamageType {
  FIRE = 'fire',
  SLASHING = 'slashing',
}

export type CharacterProps = {
  name: string;
  level: number;
  hitPoints: number;
  defenses: CharacterDefense[];
  temporaryHitPoints: number;
};

export type CreateCharacterProps = {
  name: string;
  level: number;
  hitPoints: number;
  defenses: CharacterDefense[];
};

export class Character extends AggregateRoot<CharacterProps> {
  protected _id: AggregateID;

  static create(props: CreateCharacterProps) {
    return new Character({
      id: new ObjectId().toString(),
      props: {
        name: props.name,
        level: props.level,
        hitPoints: props.hitPoints,
        defenses: props.defenses,
        temporaryHitPoints: 0,
      },
    });
  }

  takeDamage(type: CharacterDamageType, value: number) {
    let damageToTake = value;

    if (this.props.temporaryHitPoints >= damageToTake) {
      this.props.temporaryHitPoints -= damageToTake;
      return;
    } else {
      damageToTake -= this.props.temporaryHitPoints;
      this.props.temporaryHitPoints = 0;
    }

    if (this.props.hitPoints >= damageToTake) {
      this.props.hitPoints -= damageToTake;
    } else {
      this.props.hitPoints = 0;
    }
  }

  heal(value: number) {
    this.props.hitPoints += value;
  }

  addTemporaryHp(value: number) {
    this.props.temporaryHitPoints = value;
  }
}
