import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
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
}
