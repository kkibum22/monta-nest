import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    private readonly authService: AuthService,
  ) {}

  async createMember(account_id: string) {
    const account = await this.authService.findOneById(account_id);

    if (!account) {
      throw new BadRequestException('가입된 계정이 존재하지 않습니다.');
    }

    const exist = await this.membersRepository.findOne({
      where: {
        account: {
          account_id,
        },
      },
    });
    if (exist) {
      throw new BadRequestException('이미 유저가 존재합니다.');
    }

    const newMember = this.membersRepository.create({
      nickname: account.name,
      email: account.email,
      role: account.role,
      account: account,
    });

    return await this.membersRepository.save(newMember);
  }

  async findOneByAccountId(account_id: string) {
    const member = await this.membersRepository.findOne({
      where: {
        account: {
          account_id,
        },
      },
    });
    return member;
  }
}
