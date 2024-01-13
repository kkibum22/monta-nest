import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ProbabilitiesService } from './probabilities.service';
import { CreateProbabilityDto } from './dto/create-probability.dto';
import { UpdateProbabilityDto } from './dto/update-probability.dto';

@Controller('probabilities')
export class ProbabilitiesController {
  constructor(private readonly probabilitiesService: ProbabilitiesService) {}

  @Get()
  @HttpCode(200)
  async getAllProbabilities() {
    const result = await this.probabilitiesService.findAll();
    return {
      status: 200,
      data: { probabilities: result },
    };
  }

  @Post()
  @HttpCode(201)
  async createProbability(@Body() createProbabilityData: CreateProbabilityDto) {
    const result = await this.probabilitiesService.create(
      createProbabilityData,
    );
    return {
      status: 201,
      data: { probability_id: result.probability_id },
    };
  }

  @Patch(':probability_id')
  @HttpCode(200)
  async updateProbability(
    @Param('probability_id') probability_id: number,
    @Body() updateProbabilityData: UpdateProbabilityDto,
  ) {
    const result = await this.probabilitiesService.update(
      probability_id,
      updateProbabilityData,
    );
    return {
      status: 200,
      data: { probability: result },
    };
  }

  @Delete(':probability_id')
  @HttpCode(204)
  async deleteProbability(@Param('probability_id') probability_id: number) {
    await this.probabilitiesService.delete(probability_id);
    return {
      status: 204,
      data: null,
    };
  }
}
