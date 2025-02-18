import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from the .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000
  await app.listen(port);
  console.log(`Listening on port: ${port}`);
}
bootstrap();
