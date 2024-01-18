import { Module } from '@nestjs/common';
import { ProbabilitiesService } from './probabilities.service';
import { ProbabilitiesAdminController } from './probabilities.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Probability } from './entities/probability.entity';
import { ProbabilitiesController } from './probabilities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Probability])],
  controllers: [ProbabilitiesAdminController, ProbabilitiesController],
  providers: [ProbabilitiesService],
})
export class ProbabilitiesModule {}
