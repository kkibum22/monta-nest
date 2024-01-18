import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { StudyCategoriesService } from 'src/study-categories/study-categories.service';
import { CreateStudyCategoryDto } from 'src/study-categories/dtos/create-study-category.dto';
import { UpdateStudyCategoryDto } from 'src/study-categories/dtos/update-study-category.dto';

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
    @Param('member_id') member_id: string,
    @Body() createStudyCategoryDto: CreateStudyCategoryDto,
  ) {
    const member = await this.membersService.findOneByAccountId(req.user.sub);
    if (!member) {
      throw new BadRequestException(
        '로그인한 사용자의 프로필이 존재하지 않습니다.',
      );
    }

    if (member_id !== member.member_id) {
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

  @HttpCode(200)
  @Get(':member_id/study-categories')
  async getStudyCategories(@Req() req, @Param('member_id') member_id: string) {
    const member = await this.membersService.findOneByAccountId(req.user.sub);
    if (!member) {
      throw new BadRequestException(
        '로그인한 사용자의 프로필이 존재하지 않습니다.',
      );
    }

    if (member_id !== member.member_id) {
      throw new ForbiddenException('카테고리를 조회할 권한이 없습니다.');
    }

    const result = await this.studyCategoriesService.findAllByMemberId(
      member.member_id,
    );
    return {
      status: 200,
      data: {
        study_categories: result,
      },
    };
  }

  @HttpCode(204)
  @Delete(':member_id/study-categories/:study_category_id')
  async deleteCategory(
    @Req() req,
    @Param('member_id') member_id: string,
    @Param('study_category_id', ParseIntPipe) study_category_id: number,
  ) {
    const member = await this.membersService.findOneByAccountId(req.user.sub);
    if (!member) {
      throw new BadRequestException(
        '로그인한 사용자의 프로필이 존재하지 않습니다.',
      );
    }

    if (member_id !== member.member_id) {
      throw new ForbiddenException('카테고리를 삭제할 권한이 없습니다.');
    }

    const result = await this.studyCategoriesService.delete(study_category_id);
    return {
      status: 204,
      data: result,
    };
  }

  @HttpCode(200)
  @Patch(':member_id/study-categories/:study_category_id')
  async updateCategory(
    @Req() req,
    @Param('member_id') member_id: string,
    @Param('study_category_id', ParseIntPipe) study_category_id: number,
    @Body() updateStudyCategoryDto: UpdateStudyCategoryDto,
  ) {
    const member = await this.membersService.findOneByAccountId(req.user.sub);
    if (!member) {
      throw new BadRequestException(
        '로그인한 사용자의 프로필이 존재하지 않습니다.',
      );
    }

    if (member_id !== member.member_id) {
      throw new ForbiddenException('카테고리를 수정할 권한이 없습니다.');
    }

    const result = await this.studyCategoriesService.update(
      member.member_id,
      study_category_id,
      updateStudyCategoryDto,
    );
    // eslint-disable-next-line
    const { hidden: _, ...rest } = result;
    return {
      status: 200,
      data: {
        study_category: rest,
      },
    };
  }
}
