
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { CoreModule } from './core/core.module';
import fastify from 'fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const fastifyInstance = fastify()
	const httpAdapter = new FastifyAdapter(fastifyInstance)
  
  const app = await NestFactory.create<NestFastifyApplication>(
    CoreModule,
    httpAdapter
  );

  // не трогать ни при каких условиях, даже под дулом пистолета
  app.enableCors({
    origin: true
  })

  try {
    await app.listen(process.env.PORT ?? 3000, () => {
      Logger.log('App listened at http://localhost:3000')
    });
  } catch (error) {
    Logger.error(error)
  }
}
bootstrap();
