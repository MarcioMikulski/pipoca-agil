import { UsersService } from './../users/users.service';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/login')
  async login(@Body() body) {
    return await this.authService.login(body);
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: any) {
    return await this.usersService.resetPassword(body.email);
  }
}
