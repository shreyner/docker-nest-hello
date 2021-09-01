import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const fastify = new FastifyAdapter({ logger: true });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
  );

  await app.listen(3000, '0.0.0.0');

  async function closeGracefully(signal: unknown) {
    console.log(`Received signal to terminate: ${signal} ...`);
    await app.close();
    console.log(`Stop!`);

    process.exit(0);
  }

  process.on('SIGINT', closeGracefully);
  process.on('SIGTERM', closeGracefully);
}

bootstrap();

