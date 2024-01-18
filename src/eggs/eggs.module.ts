import { Module } from '@nestjs/common';
import { EggsService } from './eggs.service';
import { EggsController } from './eggs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Egg } from './entities/egg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Egg])],
  controllers: [EggsController],
  providers: [EggsService],
})
export class EggsModule {}
