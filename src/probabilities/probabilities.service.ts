import { CreateProbabilityDto } from './dto/create-probability.dto';
import { UpdateProbabilityDto } from './dto/update-probability.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Probability } from './entities/probability.entity';

@Injectable()
export class ProbabilitiesService {
  constructor(
    @InjectRepository(Probability)
    private readonly probabilityRepository: Repository<Probability>,
  ) {}

  async findAll(): Promise<Probability[]> {
    return await this.probabilityRepository.find();
  }

  async findByGrade(grade: string): Promise<Probability[]> {
    const result = await this.probabilityRepository.find({
      where: { egg_grade: grade },
    });
    return result;
  }

  async create(probabilityData: CreateProbabilityDto): Promise<Probability> {
    const newProbability = this.probabilityRepository.create(probabilityData);
    return await this.probabilityRepository.save(newProbability);
  }

  async update(
    probability_id: number,
    probabilityData: UpdateProbabilityDto,
  ): Promise<Probability> {
    await this.probabilityRepository.update(probability_id, probabilityData);
    return await this.probabilityRepository.findOne({
      where: { probability_id },
    });
  }

  async delete(probability_id: number): Promise<void> {
    await this.probabilityRepository.delete(probability_id);
  }
}
