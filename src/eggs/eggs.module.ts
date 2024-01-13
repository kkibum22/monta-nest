import { Module } from '@nestjs/common';
import { EggsService } from './eggs.service';
import { EggsController } from './eggs.controller';

@Module({
  controllers: [EggsController],
  providers: [EggsService],
})
export class EggsModule {}
