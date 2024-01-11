import { Member } from 'src/members/entities/member.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Character } from './character.entity';
import { CommonEntity } from './common.entity';

@Entity()
export class CharacterInventory extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  character_inventory_id: number;

  @ManyToOne(() => Character, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => Member, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_id' })
  member: Member;
}
