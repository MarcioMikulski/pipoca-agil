import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ type: Number, description: 'Id do usuário' })
  id: number;
  @ApiProperty({ type: String, description: 'Nome do usuário' })
  nome: string;
  @ApiProperty({ type: String, description: 'Sobrenome do usuário' })
  sobrenome: string;
  @ApiProperty({ type: String, description: 'Email do usuário' })
  email: string;
  @ApiProperty({ type: Date, description: 'Data de nascimento do usuário' })
  datanascimento: Date;
}
