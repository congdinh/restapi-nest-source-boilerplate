import config from '@configs/configuration';
import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      nodes: config.ELASTICSEARCH.NODES,
    }),
  ],
  exports: [ElasticsearchModule],
})
export class ESModule {}
