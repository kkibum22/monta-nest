import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { CharacterInventory } from './character-inventory.entity';

@Entity()
export class Character extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  character_id: string;

  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  description: string;

  @Column()
  @IsString()
  grade: string;

  @Column()
  @IsString()
  image_url: string;

  @Column()
  @IsNumber()
  sell_price: number;

  @OneToMany(
    () => CharacterInventory,
    (characterInventory) => characterInventory.character,
  )
  character_inventories: CharacterInventory[];
}
