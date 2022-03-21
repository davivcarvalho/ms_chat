import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import FastifyMultpartAdapter from 'fastify-multipart'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 4001,
      host: '0.0.0.0'
    }
  })
  app.register(FastifyMultpartAdapter)
  app.enableCors()

  await app.startAllMicroservices()
  await app.listen(process.env.PORT, '0.0.0.0')
}
bootstrap()
