import dotenv from 'dotenv';
dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_NAME: process.env.APP_NAME || 'service-demo',
  IS_PRODUCTION: process.env.NODE_ENV === 'production' || false,
  PORT: Number(process.env.PORT) || 9008,
  PREFIX: process.env.PREFIX || 'api/v1/demo',
  JWT_SECRET: process.env.JWT_SECRET || '123123',
  CORS: {
    SERVER_CORS_ENABLED: process.env.SERVER_CORS_ENABLED === 'true',
    SERVER_REQUEST_WHITE_LIST:
      process.env.SERVER_REQUEST_WHITE_LIST.split(',') || null,
  },
  REDIS: {
    PRICE_URI: process.env.REDIS_PRICE_URL || '',
    CACHE_URI: process.env.REDIS_CACHE_URL || '',
    EXPIRE_TIME: Number(process.env.REDIS_EXPIRE_TIME) || 360,
  },
  MONGO: {
    URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
  },
  ELASTICSEARCH: {
    NODES:
      process.env.ELASTICSEARCH_HOST?.split(',') || 'http://localhost:9200',
    ES_BULK_LIMIT: Number(process.env.ES_BULK_LIMIT) || 1000,
    ES_INDEX_DEMO: process.env.ES_INDEX_DEMO
  },
};

console.info(config);

export default config;
