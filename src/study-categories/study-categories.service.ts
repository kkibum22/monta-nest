import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembersService } from 'src/members/members.service';
import { StudyCategory } from './entities/study-category.entity';
import { Repository } from 'typeorm';
import { CreateStudyCategoryDto } from './dtos/create-study-category.dto';
import { UpdateStudyCategoryDto } from './dtos/update-study-category.dto';

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

  async update(
    member_id: string,
    study_category_id: number,
    { subject }: UpdateStudyCategoryDto,
  ) {
    const exist = await this.studyCategoryRepository.findOne({
      where: {
        study_category_id,
      },
    });
    if (!exist) {
      throw new BadRequestException('해당 카테고리가 존재하지 않습니다.');
    }

    if (exist.subject === subject) {
      throw new BadRequestException('변경된 내용이 없습니다.');
    }

    const targetExist = await this.studyCategoryRepository.findOne({
      where: {
        subject,
        member: {
          member_id,
        },
      },
      relations: {
        study_records: true,
      },
    });

    if (targetExist) {
      // exist 공부기록 target으로 합친 후 exist 하드 삭제

      // *** 합치기는 StudyRecordsService 메소드로 처리 (예정) ***

      // target이 소프트 삭제 된 경우 되살리기
      if (targetExist.hidden) {
        targetExist.hidden = false;
        await this.studyCategoryRepository.save(targetExist);
      }
      await this.studyCategoryRepository.delete(exist.study_category_id); // 하드 삭제
      return targetExist;
    }
    // target 기록이 없으면 subject 업데이트
    exist.subject = subject;
    await this.studyCategoryRepository.save(exist);

    return exist;
  }
}
