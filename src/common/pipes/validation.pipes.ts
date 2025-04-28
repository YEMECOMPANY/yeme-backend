import { ValidationPipe } from '@nestjs/common';

export const GlobalValidationPipe = new ValidationPipe({
  whitelist: true, // Remove unexpected fields
  forbidNonWhitelisted: false, // Allow, but strip unknown fields
  transform: true, // Auto-convert types based on DTOs
  transformOptions: {
    enableImplicitConversion: true, // Allow @Type(() => Number) without manual options
  },
});
