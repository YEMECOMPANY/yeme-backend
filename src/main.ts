import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from './common/pipes/validation.pipes';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes
  app.enableCors();

  // Global Pipes
  app.useGlobalPipes(GlobalValidationPipe);

  // Setup Swagger
  setupSwagger(app);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  // Log the URLs
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Health endpoint at http://localhost:${port}/health`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
}

bootstrap();
