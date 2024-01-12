import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './members/entities/member.entity';
import { AuthModule } from './auth/auth.module';
import { Account } from './auth/entities/account.entity';
import { CharacterInventory } from './common/entities/character-inventory.entity';
import { Character } from './common/entities/character.entity';
import { StreaksModule } from './streaks/streaks.module';
import { StudiesModule } from './studies/studies.module';
import { StatisticsModule } from './statistics/statistics.module';
import { Egg } from './common/entities/egg.entity';
import { EggInventory } from './common/entities/egg-inventory.entity';
import { Statistic } from './statistics/entities/statistic.entity';
import { StudyStreak } from './streaks/entities/study-streak.entity';
import { Palette } from './streaks/entities/palette.entity';
import { StudyCategory } from './studies/entities/study-category.entity';
import { StudyRecord } from './studies/entities/study-record.entity';
import { Probability } from './common/entities/probability.entity';
import { StreakColorChangePermission } from './streaks/entities/streak-color-change-permission.entity';
import { MembersModule } from './members/members.module';
import { TransactionRecord } from './transaction-records/entities/transaction-record.entity';
import { TransactionRecordsModule } from './transaction-records/transaction-records.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Member,
        Account,
        Egg,
        EggInventory,
        Statistic,
        StudyStreak,
        Palette,
        StudyCategory,
        StudyRecord,
        TransactionRecord,
        CharacterInventory,
        Character,
        Probability,
        StreakColorChangePermission,
      ],
      synchronize: true,
    }),
    MembersModule,
    AuthModule,
    StreaksModule,
    StudiesModule,
    StatisticsModule,
    TransactionRecordsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
