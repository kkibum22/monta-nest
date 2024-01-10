import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { MemberRole } from './user-role.enum';
import { Account } from 'src/auth/entities/account.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { CharacterInventory } from 'src/common/entities/character-inventory.entity';
import { StudyCategory } from 'src/studies/entities/study-category.entity';
import { Statistic } from 'src/statistics/entities/statistic.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { StreakColorChangePermission } from 'src/streaks/entities/streak-color-change-permission.entity';

@Entity()
export class Member extends CommonEntity {
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
    enum: MemberRole,
    default: MemberRole.USER,
  })
  @IsEnum(MemberRole)
  role: MemberRole;

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

  @OneToOne(() => Account, (account) => account.member)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany(
    () => CharacterInventory,
    (characterInventory) => characterInventory.member,
  )
  character_inventories: CharacterInventory[];

  @OneToMany(() => StudyCategory, (studyCategory) => studyCategory.member)
  study_categories: StudyCategory[];

  @OneToOne(() => Statistic, (statistic) => statistic.member)
  @JoinColumn({ name: 'statistic_id' })
  statistic: Statistic;

  @OneToMany(() => Transaction, (transaction) => transaction.member)
  transactions: Transaction[];

  @OneToOne(
    () => StreakColorChangePermission,
    (streakColorChangePermission) => streakColorChangePermission.member,
  )
  @JoinColumn({ name: 'streak_color_change_permission_id' })
  streak_color_change_permission: StreakColorChangePermission;
}
