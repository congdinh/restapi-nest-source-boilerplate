import { Module } from '@nestjs/common';
import { StatisticController } from '@modules/statistic/statistic.controller';
import { StatisticService } from '@modules/statistic/statistic.service';

@Module({
  providers: [StatisticService],
  controllers: [StatisticController],
})
export class StatisticModule {}
