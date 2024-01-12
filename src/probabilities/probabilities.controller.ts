import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProbabilitiesService } from './probabilities.service';
import { CreateProbabilityDto } from './dto/create-probability.dto';
import { UpdateProbabilityDto } from './dto/update-probability.dto';

@Controller('probabilities')
export class ProbabilitiesController {
  constructor(private readonly probabilitiesService: ProbabilitiesService) {}

  @Get()
  getAllProbabilities() {
    return this.probabilitiesService.findAll();
  }

  @Post()
  createProbability(@Body() createProbabilityData: CreateProbabilityDto) {
    return this.probabilitiesService.create(createProbabilityData);
  }

  @Patch('{probability_id}')
  updateProbability(
    @Param('probability_id') probability_id: number,
    @Body() updateProbabilityData: UpdateProbabilityDto,
  ) {
    return this.probabilitiesService.update(
      probability_id,
      updateProbabilityData,
    );
  }

  @Delete('{probability_id}')
  deleteProbability(@Param('probability_id') probability_id: number) {
    return this.probabilitiesService.delete(probability_id);
  }
}
