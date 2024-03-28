import { IsNumber, IsOptional, IsString, IsInt, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryStatisticDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsIn([11, 22, 33])
  userId?: number;
}

export class ConfigRequestDTO extends QueryStatisticDTO {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  displayId?: number;
}

export class HistoryRequestDTO extends QueryStatisticDTO {
  @IsOptional()
  @IsString()
  @IsIn(['24h', '7d', '30d', '90d', 'all'])
  interval?: string;
}

