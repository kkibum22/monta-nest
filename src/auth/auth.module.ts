import { Module } from '@nestjs/common';
import { CommonEntity } from 'src/common/entities/common.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Account } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule extends CommonEntity {}
