import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Egg } from './entities/egg.entity';
import { CreateEggDto } from './dto/create-egg.dto';
import { UpdateEggDto } from './dto/update-egg.dto';

@Injectable()
export class EggsService {
  constructor(
    @InjectRepository(Egg)
    private readonly eggRepository: Repository<Egg>,
  ) {}

  findAll(): Promise<Egg[]> {
    return this.eggRepository.find();
  }

  async findOne(egg_id: string): Promise<Egg> {
    const egg = await this.eggRepository.findOne({ where: { egg_id } });
    return egg;
  }

  async create(eggData: CreateEggDto): Promise<Egg> {
    const newEgg = this.eggRepository.create(eggData);
    return await this.eggRepository.save(newEgg);
  }

  async update(egg_id: string, eggdata: UpdateEggDto): Promise<Egg> {
    await this.eggRepository.update(egg_id, eggdata);
    return await this.eggRepository.findOne({
      where: { egg_id },
    });
  }

  async delete(egg_id: string): Promise<void> {
    await this.eggRepository.delete(egg_id);
  }
}
