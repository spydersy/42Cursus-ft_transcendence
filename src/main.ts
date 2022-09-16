import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["cookie", "Cookie", "authorization", "Authorization"],
    exposedHeaders: ["cookie", "Cookie", "authorization", "Authorization"],
  });
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('42Cursus-ft_transcendence')
    .setDescription('Ft_transcendence endpoints description')
    .setVersion('V1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8000);
}
bootstrap();
