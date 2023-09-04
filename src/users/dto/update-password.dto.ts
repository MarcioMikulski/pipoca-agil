// update-password.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senhaantiga: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  novasenha: string;
  
}