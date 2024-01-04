import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/docs*',
    basicAuth({
      challenge: true,
      users: {
        admin: 'admin',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Forum API documentation')
    .setDescription('Forum API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
