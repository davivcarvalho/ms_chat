import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter())
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 4001,
      host: '0.0.0.0'
    }
  })
  await app.startAllMicroservices()
  await app.listen(3001)
}
bootstrap()
