import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { join } from 'path';

import { AppModule } from 'domain/app.module';
import { SwaggerHelper } from 'helpers/swagger.helper';
import { MongoErrorsFilter } from 'filters/mongo-errors.filter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new MongoErrorsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public',
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swagger = new SwaggerHelper();
  swagger.init(app);

  await app.listen(process.env.PORT);
})();
