import { AggregateRoot } from '../../../libs/ddd/aggregate-root.base';
import { AggregateID } from '../../../libs/ddd/entity.base';
import { ObjectId } from 'mongodb';
import { DamageType } from './damage-type.enum';
import { DefenseSkill } from './defense-skill.enum';

export type CharacterDefense = {
  type: DamageType;
  defense: DefenseSkill;
};

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

  takeDamage(type: DamageType, value: number) {
    let damageToTake = this.calculateDamageToTake(type, value);

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

  private calculateDamageToTake(type: DamageType, value: number) {
    const defensesApplicable = this.props.defenses.filter((defense) => {
      return defense.type === type;
    });

    if (defensesApplicable.length === 0) {
      return value;
    }

    const immunity = defensesApplicable.find(
      (defense) => defense.defense === DefenseSkill.IMMUNITY,
    );

    if (immunity) {
      return 0;
    }

    const resistance = defensesApplicable.find(
      (defense) => defense.defense === DefenseSkill.RESISTANCE,
    );

    if (resistance) {
      return value / 2;
    }
  }

  heal(value: number) {
    this.props.hitPoints += value;
  }

  addTemporaryHp(value: number) {
    if (this.props.temporaryHitPoints < value) {
      this.props.temporaryHitPoints = value;
    }
  }
}
