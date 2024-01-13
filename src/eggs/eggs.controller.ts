import { Controller, Get, HttpCode } from '@nestjs/common';

import { EggsService } from './eggs.service';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { MemberRole } from 'src/members/entities/member-role.enum';

@Controller('eggs')
export class EggsController {
  constructor(private readonly eggsService: EggsService) {}

  @Get()
  @HttpCode(200)
  @Roles(MemberRole.ADMIN)
  async getAllEggs() {
    const result = await this.eggsService.findAll();
    return {
      status: 200,
      data: { eggs: result },
    };
  }
}
