import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersService } from 'src/members/members.service';
import { StudyCategory } from './entities/study-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudyCategoriesService {
  constructor(
    private readonly membersService: MembersService,
    @InjectRepository(StudyCategory)
    private membersRepository: Repository<StudyCategory>,
  ) {}
}
