import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDTO {
  @ApiProperty({ type: Number, description: 'Id do usuário' })
  id: number;
  @ApiProperty({ type: String, description: 'Nome do usuário' })
  nome: string;
  @ApiProperty({ type: String, description: 'Token de acesso' })
  access_token: string;
}
