import {
  CountRequest,
  SearchTotalHits,
  SearchRequest,
  GetRequest,
  BulkRequest,
  UpdateRequest,
  UpdateByQueryRequest,
  DeleteByQueryRequest,
} from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService as ES } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService extends ES {
  constructor() {
    super({
      nodes: process.env.ELASTICSEARCH_NODE?.split(',') ?? [],
    });
  }

  async searchTopic<T>(request: SearchRequest) {
    const response = await this.search<T>(request);
    return {
      total:
        (response.hits?.total as SearchTotalHits)?.value ??
        response?.hits?.total ??
        0,
      data: response?.hits?.hits,
    };
  }

  async countTopic(request: CountRequest) {
    const response = await this.count(request);
    return response?.count ?? 0;
  }

  async getTopic<T>(request: GetRequest) {
    return this.get<T>(request);
  }

  async bulkAPIBuzzes<T>(request: BulkRequest) {
    const response = await this.bulk<T>(request);
    if (response?.errors) {
      const erroredDocuments: any[] = this.handleBulkBuzzError(response);
      throw new Error(JSON.stringify(erroredDocuments));
    }
    return response;
  }

  async updateTopic(request: UpdateRequest) {
    const response = await this.update(request);
    if (!response || response?.result !== 'updated') {
      throw new Error(response.result);
    }
    return {
      _index: response?._index,
      _id: response?._id,
      _source: response?.get?._source,
    };
  }

  async updateByQueryTopic(request: UpdateByQueryRequest) {
    const response = await this.updateByQuery(request);
    if (!response || (response?.updated && response?.updated === 0)) {
      throw new Error('Cannot update buzz, plz try again.');
    }
    return response;
  }

  async deleteByQueryTopic(request: DeleteByQueryRequest) {
    const response = await this.deleteByQuery(request);
    if (!response || (response?.deleted && response?.deleted === 0)) {
      throw new Error('Cannot delete buzz, plz try again.');
    }
    return response;
  }

  private handleBulkBuzzError(bulkResponse: any) {
    const erroredDocuments: any = [];
    bulkResponse.items.forEach((action: any) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          status: action[operation].status,
          error: action[operation].error,
        });
      }
    });
    return erroredDocuments;
  }
}
