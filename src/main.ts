import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import FastifyMultpartAdapter from 'fastify-multipart'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  console.log()
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['loved-whippet-8108-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'bG92ZWQtd2hpcHBldC04MTA4JGQK_qaqHQVnpXOD02ItKZfS41tGoWrbMp0Pv4k',
          password: '5IVOSoz6lDU9zf9TNXBmqmxmgGkDIxPesCGC-JANU8LtWamG1fmuLN3o3gEos3RNniklwg=='
        },
        ssl: true
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
