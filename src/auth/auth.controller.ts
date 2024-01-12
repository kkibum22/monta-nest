import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAccountDto: CreateAccountDto) {
    const createdAccount =
      await this.authService.registerAccount(createAccountDto);

    return createdAccount.account_id;
  }
}
