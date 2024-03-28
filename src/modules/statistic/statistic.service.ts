import { Redis } from 'ioredis';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Inject,
  Injectable,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { REDIS_PROVIDER } from '@databases/redis/redis.providers';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class StatisticService {
  private readonly logger = new Logger(StatisticService.name);

  constructor(
    private readonly esService: ElasticsearchService,
    @Inject(REDIS_PROVIDER.CACHE) private readonly redisCache: Redis,
  ) {}

  getConfigInfo() {
    return true;
  }
}
