import { Module, forwardRef } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { AuthModule } from '@src/auth/auth.module';
import { StudyCategoriesModule } from '@src/study-categories/study-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    AuthModule,
    forwardRef(() => StudyCategoriesModule),
  ],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
