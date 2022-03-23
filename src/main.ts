import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import FastifyMultpartAdapter from 'fastify-multipart'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  console.log()
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL
    }
  })
  app.register(FastifyMultpartAdapter)
  app.enableCors()

  await app.startAllMicroservices()
  await app.listen(process.env.PORT, '0.0.0.0')
}
bootstrap()
