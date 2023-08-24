import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class RecuperaEmailService {
  private resetTokens: Record<string, string> = {};

  generateResetToken(email: string): string {
    const token = crypto.randomBytes(20).toString('hex');
    this.resetTokens[email] = token;
    return token;
  }

  getResetToken(email: string): string | undefined {
    return this.resetTokens[email];
  }

  deleteResetToken(email: string) {
    delete this.resetTokens[email];
  }
}
