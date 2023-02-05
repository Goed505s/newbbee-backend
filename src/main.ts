import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require ('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(process.env.PORT);
  console.log(`[a2-cinemas-api] Application running at localhost:${process.env.PORT}.`);
  console.log(`[a2-cinemas-api] Access the playground at localhost:${process.env.PORT}/graphql.`);
}
bootstrap();
