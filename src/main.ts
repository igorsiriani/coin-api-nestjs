import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors ={
    origin: "*",
    methods: "GET,PUT,POST,DELETE"
  }

  app.enableCors(cors);
  await app.listen(3000);
}
bootstrap();
