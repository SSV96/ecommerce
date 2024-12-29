import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const port = 3000;
    await app.listen(port);

    logger.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    logger.error('Error starting the server', error.stack);
  }
}

bootstrap();
