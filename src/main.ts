import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()
    .setTitle('Yeme API')
    .setDescription('Yeme API Description')
    .setVersion('1.0')
    .addTag('yeme')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
