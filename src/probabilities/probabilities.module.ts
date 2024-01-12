import { Module } from '@nestjs/common';
import { ProbabilitiesService } from './probabilities.service';
import { ProbabilitiesController } from './probabilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Probability } from './entities/probability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Probability])],
  controllers: [ProbabilitiesController],
  providers: [ProbabilitiesService],
})
export class ProbabilitiesModule {}
