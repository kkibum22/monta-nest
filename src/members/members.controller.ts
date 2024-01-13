import { Controller, HttpCode, Post, Req } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

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
}
