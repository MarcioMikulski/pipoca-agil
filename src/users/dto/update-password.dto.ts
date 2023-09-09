// update-password.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  senhaantiga: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  novasenha: string;
}
