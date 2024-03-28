import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SECONDS_TO_MILLISECONDS } from '@commons/constants';
import config from '@configs/configuration';

import { MongoDBModule } from '@databases/mongo/mongo.module';
import { RedisModule } from '@databases/redis/redis.module';
import { ESModule } from '@databases/elasticsearch/elasticsearch.module';

import { HealthModule } from '@modules/health/health.module';
import { StatisticModule } from '@modules/statistic/statistic.module';
import { CatsModule } from '@modules/cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: SECONDS_TO_MILLISECONDS.TEN,
        limit: 100,
      },
    ]),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: config.REDIS.CACHE_URI,
      ttl: config.REDIS.EXPIRE_TIME,
      isGlobal: true,
    }),
    CommandModule,
    HealthModule,
    RedisModule,
    ESModule,
    MongoDBModule,
    StatisticModule,
    CatsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
