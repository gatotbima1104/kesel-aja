import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    methods: 'GET,POST,PATCH,DELETE',
    origin: '*'
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  await app.listen(process.env.PORT || 3080);
}
bootstrap();