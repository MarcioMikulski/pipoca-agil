import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
