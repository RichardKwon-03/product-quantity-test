import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import Redlock from 'redlock';
import { BullModule } from '@nestjs/bull';
import { getRedisConfig, getBullRedisConfig } from './redis.config';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: getBullRedisConfig(configService),
      }),
    }),
    BullModule.registerQueue({
      name: 'BULL_QUEUE',
    }),
  ],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        const redisOptions = getRedisConfig(configService);
        return new Redis(redisOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDLOCK',
      useFactory: (redis: Redis) => {
        return new Redlock([redis], {
          retryCount: 10,
          retryDelay: 200, // ms
        });
      },
      inject: ['REDIS_CLIENT'],
    },
  ],
  exports: ['REDIS_CLIENT', 'REDLOCK', BullModule],
})
export class RedisModule {}
