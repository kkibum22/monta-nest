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
import { Roles } from '@src/auth/decorators/roles.decorator';
import { MemberRole } from '@src/members/entities/member-role.enum';

@Controller('admin/probabilities')
export class ProbabilitiesAdminController {
  constructor(private readonly probabilitiesService: ProbabilitiesService) {}

  @Roles(MemberRole.ADMIN)
  @HttpCode(200)
  @Get()
  async getAllProbabilities() {
    const result = await this.probabilitiesService.findAll();
    return {
      status: 200,
      data: { probabilities: result },
    };
  }

  @HttpCode(201)
  @Roles(MemberRole.ADMIN)
  @Post()
  async createProbability(@Body() createProbabilityData: CreateProbabilityDto) {
    const result = await this.probabilitiesService.create(
      createProbabilityData,
    );
    return {
      status: 201,
      data: { probability_id: result.probability_id },
    };
  }

  @HttpCode(200)
  @Roles(MemberRole.ADMIN)
  @Patch(':probability_id')
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

  @HttpCode(204)
  @Roles(MemberRole.ADMIN)
  @Delete(':probability_id')
  async deleteProbability(@Param('probability_id') probability_id: number) {
    await this.probabilitiesService.delete(probability_id);
    return {
      status: 204,
      data: null,
    };
  }
}
