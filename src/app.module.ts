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
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'chat',
      autoLoadEntities: true,
      synchronize: true
    }),
    MessagesModule,
    RoomsModule,
    UsersModule
  ]
})
export class AppModule {}
