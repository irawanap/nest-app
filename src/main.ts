import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that do not have decorators
    forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are found
    transform: true, // Automatically transform payloads to DTO instances
    transformOptions: {
      enableImplicitConversion: true, // Convert string numbers to actual numbers
    },
  }));

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();