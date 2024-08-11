import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.secretKey = configService.get<string>('JWT_SECRET');
  }

  sign(payload: any): string {
    return jwt.sign(payload, this.secretKey, { algorithm: 'HS256' });
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Ошибка верификации токена');
    }
  }
}
