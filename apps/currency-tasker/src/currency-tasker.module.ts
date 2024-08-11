import { Module } from '@nestjs/common';
import { CurrencyTaskerService } from './currency-tasker.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    RedisModule.forRoot({
      url: process.env.REDIS_URL,
      type: 'single',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
  ],
  controllers: [],
  providers: [CurrencyTaskerService],
})
export class CurrencyTaskerModule {}
