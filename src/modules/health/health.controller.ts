import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthCheckService) {}

  @Get()
  @HealthCheck()
  health() {
    return this.healthService.check([]);
  }
}
