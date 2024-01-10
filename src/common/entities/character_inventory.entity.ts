import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Character } from './character.entity';
import { CommonEntity } from './common.entity';

@Entity()
export class CharacterInventory extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
