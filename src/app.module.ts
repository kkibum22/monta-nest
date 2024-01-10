import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Account } from './auth/entities/account.entity';
import { CharacterInventory } from './common/entities/character-inventory.entity';
import { Character } from './common/entities/character.entity';
import { StreaksModule } from './streaks/streaks.module';
import { StudiesModule } from './studies/studies.module';
import { StatisticsModule } from './statistics/statistics.module';
import { Egg } from './common/entities/egg.entity';
import { EggInventory } from './common/entities/egg-inventory.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { Statistic } from './statistics/entities/statistic.entity';
import { StudyStreak } from './streaks/entities/study-streak.entity';
import { Palette } from './streaks/entities/palette.entity';
import { StudyCategory } from './studies/entities/study-category.entity';
import { StudyRecord } from './studies/entities/study-record.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { Probability } from './common/entities/probability.entity';

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
        User,
        Account,
        CharacterInventory,
        Character,
        Egg,
        EggInventory,
        Statistic,
        StudyStreak,
        Palette,
        StudyCategory,
        StudyRecord,
        Transaction,
        CharacterInventory,
        Character,
        Probability,
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    StreaksModule,
    StudiesModule,
    StatisticsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
