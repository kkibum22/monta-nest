import { IsEnum, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Member } from 'src/members/entities/member.entity';
import { MemberRole } from 'src/members/entities/user-role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Account extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  email: string;

  @Column({
    type: 'enum',
    enum: MemberRole,
    default: MemberRole.USER,
  })
  @IsEnum(MemberRole)
  role: MemberRole;

  @OneToOne(() => Member, (member) => member.account)
  member: Member;
}
