import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from 'src/common/interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async validateAccount(
    email: string,
    pass: string,
  ): Promise<Omit<Account, 'password'>> {
    const account = await this.findOneByEmail(email);

    // eslint-disable-next-line
    const { password: _, ...readOnlyData } = account;
    if (account && bcrypt.compareSync(pass, account.password)) {
      return readOnlyData;
    }
    return null;
  }

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

  async login(account: any) {
    const payload: JWTPayload = {
      sub: account.account_id,
      email: account.email,
      role: account.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOneByEmail(email: string) {
    const account = await this.accountsRepository.findOne({
      where: {
        email,
      },
    });

    return account;
  }

  async findOneById(id: string) {
    const account = await this.accountsRepository.findOne({
      where: {
        account_id: id,
      },
    });

    return account;
  }
}
