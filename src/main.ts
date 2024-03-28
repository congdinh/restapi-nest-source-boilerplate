import { AppModule } from '@app';
import { NestFactory } from '@nestjs/core';
import appConfig from '@configs/app.config';
import config from '@configs/configuration';
import * as fs from 'fs';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      config.NODE_ENV == 'development'
        ? ['debug', 'error', 'log', 'verbose', 'warn']
        : ['error', 'warn', 'log'],
  });

  await appConfig(app);

  if (!config.IS_PRODUCTION) {
    const configSwagger = new DocumentBuilder()
      .addBearerAuth()
      .addCookieAuth()
      .addBearerAuth()
      .setTitle('API Documentation')
      .setDescription('Service')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, configSwagger);
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(config.PORT).then(async () => {
    console.log('Server is listening on:', await app.getUrl());
    console.log(
      'Server health:',
      `${await app.getUrl()}/${config.PREFIX}/health`,
    );
    console.log(
      'Documentation server is listening on:',
      `${await app.getUrl()}/swagger`,
    );
  });
}
bootstrap();
