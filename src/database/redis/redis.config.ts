import { ConfigService } from '@nestjs/config';

export interface RedisConfigOptions {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

export const getRedisConfig = (config: ConfigService): RedisConfigOptions => ({
  host: config.get<string>('REDIS_HOST')!,
  port: Number(config.get('REDIS_PORT')),
  password: config.get<string>('REDIS_PASSWORD'),
  db: Number(config.get('REDIS_DB') ?? 0),
});

export const getBullRedisConfig = (
  config: ConfigService,
): RedisConfigOptions => ({
  host: config.get<string>('BULL_REDIS_HOST')!,
  port: Number(config.get('BULL_REDIS_PORT')),
  password: config.get<string>('BULL_REDIS_PASSWORD'),
  db: Number(config.get('BULL_REDIS_DB') ?? 0),
});
