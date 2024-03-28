import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ROUTER } from '@configs/route.config';
import { User, TokenPayLoad } from '@modules/auth/decorators/user.decorator';
import { AuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CACHE_KEY_PREFIX, MINUTES_TO_SECONDS } from '@commons/constants';
import { HttpCacheInterceptor } from '@commons/interceptors/caches/http-cache.interceptor';

import { StatisticService } from '@modules/statistic/statistic.service';
// @UseGuards(PrivateGuard)
@Controller(ROUTER.STATISTIC.default)
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  // @UseGuards(AuthGuard)
  // @CacheKey(CACHE_KEY_PREFIX.SERVICE_KEY)
  // @CacheTTL(MINUTES_TO_SECONDS.TEN)
  // @UseInterceptors(HttpCacheInterceptor)
  configInfo() {
    // @User() user: TokenPayLoad,
    return this.statisticService.getConfigInfo();
  }
}
