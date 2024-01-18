import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersService } from 'src/members/members.service';
import { StudyCategory } from './entities/study-category.entity';
import { Repository } from 'typeorm';
import { CreateStudyCategoryDto } from './dtos/create-study-category.dto';

@Injectable()
export class StudyCategoriesService {
  constructor(
    private readonly membersService: MembersService,
    @InjectRepository(StudyCategory)
    private studyCategoryRepository: Repository<StudyCategory>,
  ) {}

  async create(member_id: string, { subject }: CreateStudyCategoryDto) {
    const exist = await this.studyCategoryRepository.findOne({
      where: {
        member: { member_id: member_id },
        subject,
      },
    });
    if (exist && !exist.hidden) {
      throw new BadRequestException('이미 동일한 카테고리가 존재합니다.');
    }
    // 만들어진 이력이 있으면 살리기
    if (exist) {
      exist.hidden = false;
      const result = await this.studyCategoryRepository.save(exist);

      return result;
    } else {
      const newCategory = this.studyCategoryRepository.create({
        member: {
          member_id,
        },
        subject,
        hidden: false,
      });

      const result = await this.studyCategoryRepository.save(newCategory);

      return result;
    }
  }

  async findAllByMemberId(member_id: string) {
    const categories = await this.studyCategoryRepository.find({
      where: {
        member: {
          member_id,
        },
        hidden: false,
      },
      select: {
        study_category_id: true,
        subject: true,
      },
    });
    return categories;
  }

  async delete(study_category_id: number) {
    const exist = await this.studyCategoryRepository.findOne({
      where: {
        study_category_id,
      },
    });
    if (!exist) {
      throw new BadRequestException('해당 카테고리가 존재하지 않습니다.');
    }
    if (exist.hidden) {
      throw new BadRequestException('이미 삭제된 카테고리입니다.');
    }
    exist.hidden = true;

    await this.studyCategoryRepository.save(exist);

    return null;
  }
}
