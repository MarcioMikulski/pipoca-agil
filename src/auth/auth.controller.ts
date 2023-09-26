import { UsersService } from './../users/users.service';
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) { }

  @Post('/login')
  @ApiResponse({ status: 200, description: 'Login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() body) {
    return await this.authService.login(body);
  }

  @Post('/reset-password')
  @ApiResponse({ status: 200, description: 'Reset password' })
  @ApiResponse({ status: 401, description: 'Usuário não encontrado' })
  async resetPassword(@Body() body: any) {
    return await this.usersService.resetPassword(body.email);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {

    const user = this.authService.googleLogin(req)
    this.authService.createUsergoogle(user)
    return user
  }


}



