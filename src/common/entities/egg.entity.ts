import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { EggInventory } from './egg-inventory.entity';

@Entity()
export class Egg extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  egg_id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsNumber()
  required_study_time: number;

  @Column()
  @IsNumber()
  purchase_price: number;

  @Column()
  @IsString()
  image_url: string;

  @Column()
  @IsString()
  grade: string;

  @OneToMany(() => EggInventory, (eggInventory) => eggInventory.egg)
  egg_inventories: EggInventory[];
}
