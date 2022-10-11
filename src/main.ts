import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'

// HELPER FUNCITON
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class VersionHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // When the request is HTTP
    console.log("CHECKER00");
    if (context.getType() === 'http') {
    console.log("CHECKER01");
    const http = context.switchToHttp();
      const response: Response = http.getResponse();
      response.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    }

    return next.handle();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new VersionHeaderInterceptor());
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT"],
    credentials: true,
    allowedHeaders: ["cookie", "Cookie", "authorization", "Authorization", "content-type"],
    exposedHeaders: ["cookie", "Cookie", "authorization", "Authorization", "content-type"],
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
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


// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
