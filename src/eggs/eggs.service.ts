import { Injectable } from '@nestjs/common';
import { CreateEggDto } from './dto/create-egg.dto';
import { UpdateEggDto } from './dto/update-egg.dto';

@Injectable()
export class EggsService {
  create(createEggDto: CreateEggDto) {
    return 'This action adds a new egg';
  }

  findAll() {
    return `This action returns all eggs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} egg`;
  }

  update(id: number, updateEggDto: UpdateEggDto) {
    return `This action updates a #${id} egg`;
  }

  delete(id: number) {
    return `This action removes a #${id} egg`;
  }
}
