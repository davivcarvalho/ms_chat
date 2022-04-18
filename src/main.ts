import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import FastifyMultpartAdapter from 'fastify-multipart'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client:
        process.env.NODE_ENV === 'production'
          ? {
              brokers: String(process.env.KAFKA_HOST).split(','),
              sasl: {
                mechanism: process.env.KAFKA_MECHANISM,
                username: process.env.KAFKA_USERNAME,
                password: process.env.KAFKA_PASSWORD
              },
              ssl: process.env.KAFKA_SSL
            }
          : {
              brokers: String(process.env.KAFKA_HOST).split(',')
            },
      consumer: {
        groupId: 'chat-consumer'
      }
    }
  })
  app.register(FastifyMultpartAdapter)
  app.enableCors()
  app.enableShutdownHooks()

  await app.startAllMicroservices()
  await app.listen(process.env.PORT, '0.0.0.0')
}
bootstrap()
