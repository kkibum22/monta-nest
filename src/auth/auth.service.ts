import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async registerAccount({ email, password, name }: CreateAccountDto) {
    const exist = await this.accountsRepository.findOne({ where: { email } });

    if (exist) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = this.accountsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return this.accountsRepository.save(newAccount);
  }
}
