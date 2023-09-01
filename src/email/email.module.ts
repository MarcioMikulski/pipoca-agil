import { Module } from '@nestjs/common';


//import { LocalStrategy } from './local.auth';

import { EmailService } from './email.service';

@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
