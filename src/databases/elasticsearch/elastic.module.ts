import { Global, Module } from '@nestjs/common';
import { ElasticsearchService } from '@databases/elasticsearch/elastic.service';

@Global()
@Module({
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ESModule {}
