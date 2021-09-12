import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileStreamController } from './helpers/fileStream.provider'
import { MessagesModule } from './messages/messages.module'
import { RoomsModule } from './rooms/rooms.module'
import { UsersModule } from './users/users.module'

@Module({
  controllers: [FileStreamController],
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
    }),
    MessagesModule,
    RoomsModule,
    UsersModule
  ]
})
export class AppModule {}
