import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
// import { SuccessInterceptor } from '@commons/interceptors/success-response.interceptor';
import { ExceptionHandlerInterceptor } from '@commons/interceptors/exception-handler.interceptor';
import origin from '@configs/origin.config';
import config from '@configs/configuration';

const appConfig = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      validationError: {
        target: false,
      },
    }),
  );
  app.useGlobalInterceptors(new ExceptionHandlerInterceptor());
  app.use(helmet());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser());
  app.enableCors(origin);
  app.use(compression());
  app.setGlobalPrefix(config.PREFIX);
};

export default appConfig;
