import Redis from 'ioredis';
import { config } from '../../../conf/build/src';

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});
