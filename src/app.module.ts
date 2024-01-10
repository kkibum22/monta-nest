import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Account } from './auth/entities/account.entity';
import { CharacterInventory } from './common/entities/character_inventory.entity';
import { Character } from './common/entities/character.entity';
import { StreakModule } from './streak/streak.module';
import { StudyModule } from './study/study.module';
import { StatisticsModule } from './statistics/statistics.module';
import { Egg } from './common/entities/egg.entity';
import { EggInventory } from './common/entities/egg_inventory.entity';
import { StudyCategory } from './study/entities/study-category.entity';
import { StudyRecord } from './study/entities/study-record.entity';
import { StudyStreak } from './streak/entities/study_streak.entity';
import { Palette } from './streak/entities/palette.entity';
import { Statistic } from './statistics/entities/statistic.entity';

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
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    StreakModule,
    StudyModule,
    StatisticsModule,
    StudyCategory,
    StudyRecord,
    StudyStreak,
    Palette,
    Statistic,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
