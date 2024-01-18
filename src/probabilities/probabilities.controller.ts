import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ProbabilitiesService } from './probabilities.service';

@Controller('probabilities')
export class ProbabilitiesController {
  constructor(private readonly probabilitiesService: ProbabilitiesService) {}

  @Get()
  @HttpCode(200)
  async getEggProbabilities(@Query('grade') grade: string) {
    const result = await this.probabilitiesService.findByGrade(grade);
    console.log(grade);
    return {
      status: 200,
      data: { probabilities: result },
    };
  }
}
