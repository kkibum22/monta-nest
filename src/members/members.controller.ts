import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { StudyCategoriesService } from 'src/study-categories/study-categories.service';
import { CreateStudyCategoryDto } from 'src/study-categories/dtos/create-study-category.dto';

@Controller('members')
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
    private readonly studyCategoriesService: StudyCategoriesService,
  ) {}

  @HttpCode(201)
  @Post()
  async createMember(@Req() req) {
    const result = await this.membersService.createMember(req.user.sub);
    return {
      status: 201,
      data: {
        member_id: result.member_id,
      },
    };
  }

  @HttpCode(201)
  @Post(':member_id/study-categories')
  async createCategory(
    @Req() req,
    @Param('member_id') memberId: string,
    @Body() createStudyCategoryDto: CreateStudyCategoryDto,
  ) {
    const member = await this.membersService.findOneByAccountId(req.user.sub);
    if (!member) {
      throw new BadRequestException(
        '로그인한 사용자의 프로필이 존재하지 않습니다.',
      );
    }

    if (memberId !== member.member_id) {
      throw new ForbiddenException('카테고리를 생성할 권한이 없습니다.');
    }

    const result = await this.studyCategoriesService.create(
      member.member_id,
      createStudyCategoryDto,
    );
    return {
      status: 201,
      data: {
        study_category_id: result.study_category_id,
      },
    };
  }
}
