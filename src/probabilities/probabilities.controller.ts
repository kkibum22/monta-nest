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
  getAllProbabilities() {
    return this.probabilitiesService.findAll();
  }

  @Post()
  @HttpCode(201)
  createProbability(@Body() createProbabilityData: CreateProbabilityDto) {
    return this.probabilitiesService.create(createProbabilityData);
    return {
      status: 201,
      data: { probability_id: Number },
    };
  }

  @Patch('probability_id')
  @HttpCode(200)
  updateProbability(
    @Param('probability_id') probability_id: number,
    @Body() updateProbabilityData: UpdateProbabilityDto,
  ) {
    return this.probabilitiesService.update(
      probability_id,
      updateProbabilityData,
    );
    return {
      status: 201,
      data: { probability_id: Number },
    };
  }

  @Delete('probability_id')
  @HttpCode(204)
  deleteProbability(@Param('probability_id') probability_id: number) {
    return this.probabilitiesService.delete(probability_id);
    return {
      status: 204,
      data: { probability_id: Number },
    };
  }
}
