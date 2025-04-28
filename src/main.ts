import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from './common/pipes/validation.pipes';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**Global Pipes */
  app.useGlobalPipes(GlobalValidationPipe);

  // Setup Swagger
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
