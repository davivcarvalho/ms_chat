import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatController } from './chat.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'ms_chat',
      database: 'ms_chat',
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [ChatController]
})
export class ChatModule {}
