import config from '@configs/configuration';

export default {
  origin: (origin: string, callback: any) => {
    if (
      !origin ||
      !config.CORS.SERVER_CORS_ENABLED ||
      config.CORS.SERVER_REQUEST_WHITE_LIST.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback('Not allowed access!', false);
    }
  },
  credentials: true,
};
