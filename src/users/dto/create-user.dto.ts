import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  sobrenome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  datanascimento: Date;
}
