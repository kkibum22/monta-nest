import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Account } from 'src/auth/entities/account.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { CharacterInventory } from 'src/common/entities/character-inventory.entity';
import { StudyCategory } from 'src/studies/entities/study-category.entity';
import { Statistic } from 'src/statistics/entities/statistic.entity';
import { StreakColorChangePermission } from 'src/streaks/entities/streak-color-change-permission.entity';
import { TransactionRecord } from 'src/transaction-records/entities/transaction-record.entity';
import { EggInventory } from 'src/common/entities/egg-inventory.entity';
import { MemberRole } from './member-role.enum';

@Entity()
export class Member extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  member_id: string;

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

  @OneToMany(() => EggInventory, (eggInventory) => eggInventory.member)
  egg_inventories: EggInventory[];

  @OneToMany(() => StudyCategory, (studyCategory) => studyCategory.member)
  study_categories: StudyCategory[];

  @OneToOne(() => Statistic, (statistic) => statistic.member)
  @JoinColumn({ name: 'statistic_id' })
  statistic: Statistic;

  @OneToMany(
    () => TransactionRecord,
    (transactionRecord) => transactionRecord.member,
  )
  transaction_records: TransactionRecord[];

  @OneToOne(
    () => StreakColorChangePermission,
    (streakColorChangePermission) => streakColorChangePermission.member,
  )
  @JoinColumn({ name: 'streak_color_change_permission_id' })
  streak_color_change_permission: StreakColorChangePermission;
}
