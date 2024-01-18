import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { MemberRole } from '@src/members/entities/member-role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Public()
  @Post('register')
  async register(@Body() createAccountDto: CreateAccountDto) {
    const createdAccount =
      await this.authService.registerAccount(createAccountDto);

    return {
      status: 201,
      data: {
        account_id: createdAccount.account_id,
      },
    };
  }

  @HttpCode(200)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return {
      status: 200,
      data: {
        ...result,
      },
    };
  }

  // 임시
  @Roles(MemberRole.ADMIN)
  @Get('profile')
  async getProfile(@Request() req) {
    const account = await this.authService.findOneById(req.user.sub);
    // eslint-disable-next-line
    const { password: _, ...readOnlyData } = account;
    return {
      status: 200,
      data: {
        ...readOnlyData,
      },
    };
  }
}
