import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  sobrenome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
}
