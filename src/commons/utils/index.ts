import moment from 'moment';
import { Redis } from 'ioredis';

export const cleanObject = (object: any) => {
  Object.entries(object).forEach(([k, v]: any) => {
    if (v && typeof v === 'object') cleanObject(v);
    if (
      (v && typeof v === 'object' && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v.length === 0
    ) {
      if (Array.isArray(object)) object.splice(k, 1);
      else if (!(v instanceof Date)) delete object[k];
    }
  });
  return object;
};

/**
 * @param ms : millisecond
 * @returns : await during ms
 */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const removeSpecialCharacters = (string: string) =>
  string.replace(/[^\w\s]/g, '');

export const getPageInfo = (docCount: number, limit: number, skip: number) => {
  const totalPage = limit > 0 ? Math.ceil(docCount / limit) || 1 : 0;
  // const currentPage = Math.ceil((skip + 1) / limit);
  const currentPage = skip + 1;

  return {
    limit,
    totalDocs: docCount,
    totalPage,
    currentPage,
    hasNextPage: currentPage < totalPage,
    hasPreviousPage: currentPage > 1,
  };
};

const dateType = {
  week: 'GGGGWW',
  month: 'YYYYMM',
  year: 'YYYY',
};

export const getIndexDateByPrefix = ({
  indexPrefix,
  date,
  type,
}: {
  indexPrefix: string;
  date: number;
  type: 'week' | 'month' | 'year';
}) => {
  if (!indexPrefix || !type) throw new Error('Index prefix is required');
  if (date.toString().length === 10) date = date * 1000;
  const dateTime = moment(new Date(date));
  if (!dateTime.isValid()) {
    throw new Error(`Invalid date time format. You provided {date: ${date}}`);
  }

  return `${indexPrefix}-${dateTime.format(dateType[type])}`;
};

export const getIndexPrefix = ({
  indexPrefix,
  key = '*',
}: {
  indexPrefix: string;
  key?: string | string[] | number | number[];
}) => {
  if (key && Array.isArray(key)) {
    return key.map((item: string | number) => `${indexPrefix}${item}`);
  }
  return `${indexPrefix}${key}`;
};

export const flushPrefixCache = (redis: Redis, cachePrefix: string) => {
  if (redis) {
    const stream = redis.scanStream({
      match: `${cachePrefix}*`,
    });
    stream.on('data', (keys: string[]) => {
      if (keys.length) {
        const pipeline = redis.pipeline();
        keys.forEach((key) => {
          console.log(`Deleted cache: ${key}`);
          pipeline.del(key);
        });
        pipeline.exec();
      }
    });
    stream.on('end', () => {
      console.log(`Flushed done cache: ${cachePrefix}*`);
    });
    return 'ok';
  }
  return null;
};
