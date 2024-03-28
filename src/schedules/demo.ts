import compression from 'compression';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import config from '@configs/configuration';
import { MongoDBModule } from '@databases/mongo/mongo.module';
import { RedisModule } from '@databases/redis/redis.module';
import { ESModule } from '@databases/elasticsearch/elasticsearch.module';
import { StatisticModule } from '@modules/statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: config.REDIS.CACHE_URI,
      ttl: config.REDIS.EXPIRE_TIME,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    RedisModule,
    MongoDBModule,
    ESModule,
    StatisticModule,
  ],
})
export class AppModule {}

async function startServer(app: any, port: number) {
  while (true) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port, resolve);
        server.catch(reject);
      });
      console.log(`Schedule Jobs started on random port ${port}`);
      break;
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use, trying another one...`);
        port = Math.floor(Math.random() * 60000) + 1024; // Random port between 1024 and 65535
      } else {
        console.error('An error occurred:', err);
        break;
      }
    }
  }
}

const run = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  startServer(app, config.PORT);
};

run();
