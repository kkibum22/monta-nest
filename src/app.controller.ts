import { Controller, Get, Req } from '@nestjs/common';
import { MembersService } from './members/members.service';

@Controller()
export class AppController {
  constructor(private readonly memberService: MembersService) {}

  @Get('me')
  async getMe(@Req() req) {
    const member = await this.memberService.findOneByAccountId(req.user.sub);
    return {
      status: 200,
      data: {
        member,
      },
    };
  }
}
