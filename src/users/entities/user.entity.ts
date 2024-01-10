import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { Account } from 'src/auth/entities/account.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { CharacterInventory } from 'src/common/entities/character-inventory.entity';
import { StudyCategory } from 'src/studies/entities/study-category.entity';
import { Statistic } from 'src/statistics/entities/statistic.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { StreakColorChangePermission } from 'src/streaks/entities/streak-color-change-permission.entity';

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  nickname: string;

  @Column()
  @IsString()
  email: string;

  @Column({
    nullable: true,
  })
  @IsString()
  image_url: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({
    nullable: true,
  })
  @IsString()
  active_record_id: string;

  @Column({
    nullable: true,
  })
  @IsString()
  active_egg_id: string;

  @Column({
    default: 0,
  })
  @IsNumber()
  point: number;

  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn()
  account: Account;

  @OneToMany(
    () => CharacterInventory,
    (characterInventory) => characterInventory.user,
  )
  character_inventories: CharacterInventory[];

  @OneToMany(() => StudyCategory, (studyCategory) => studyCategory.user)
  study_categories: StudyCategory[];

  @OneToOne(() => Statistic, (statistic) => statistic.user)
  statistic: Statistic;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToOne(
    () => StreakColorChangePermission,
    (streakColorChangePermission) => streakColorChangePermission.user,
  )
  streak_color_change_permission: StreakColorChangePermission;
}
