import { Character } from './Character';
import { DamageType } from './damage-type.enum';
import { DefenseSkill } from './defense-skill.enum';

describe('Character Spec', () => {
  let character: Character;

  beforeEach(() => {
    character = new Character({
      id: '65ed8456dc5b2bbe810934bb',
      props: {
        name: 'Test',
        level: 1,
        hitPoints: 10,
        defenses: [
          {
            type: DamageType.COLD,
            defense: DefenseSkill.RESISTANCE,
          },
          {
            type: DamageType.FIRE,
            defense: DefenseSkill.IMMUNITY,
          },
        ],
        temporaryHitPoints: 5,
      },
    });
  });

  describe('takeDamage', () => {
    it('should take appropriate damage - no defense', () => {
      character.takeDamage(DamageType.ACID, 10);
      expect(character.getProps().hitPoints).toBe(5);
      expect(character.getProps().temporaryHitPoints).toBe(0);
    });

    it('should take no damage - immunity', () => {
      character.takeDamage(DamageType.FIRE, 10);
      expect(character.getProps().hitPoints).toBe(10);
      expect(character.getProps().temporaryHitPoints).toBe(5);
    });

    it('should take half damage - resistance', () => {
      character.takeDamage(DamageType.COLD, 10);
      expect(character.getProps().hitPoints).toBe(10);
      expect(character.getProps().temporaryHitPoints).toBe(0);
    });

    it('should take no more damage than hit points + temporary hit points', () => {
      character.takeDamage(DamageType.ACID, 2000);
      expect(character.getProps().hitPoints).toBe(0);
      expect(character.getProps().temporaryHitPoints).toBe(0);
    });
  });

  describe('heal', () => {
    it('should heal the character', () => {
      character.heal(5);
      expect(character.getProps().hitPoints).toBe(15);
    });
  });

  describe('addTemporaryHitPoints', () => {
    it('should add temporary hit points', () => {
      character.addTemporaryHp(15);
      expect(character.getProps().temporaryHitPoints).toBe(15);
    });

    it(`shouldn't add temporary hit points because character already has more than the new value`, () => {
      character.addTemporaryHp(2);
      expect(character.getProps().temporaryHitPoints).toBe(5);
    });
  });
});
