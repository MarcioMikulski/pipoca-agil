import { RecuperaEmailController } from './recupera-email.controller';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

//import { LocalStrategy } from './local.auth';

import { RecuperaEmailService } from './recupera-email.service';

@Module({
  imports: [UsersModule],
  controllers: [RecuperaEmailController],
  providers: [RecuperaEmailService],
})
export class RecuperaEmailModule {}
