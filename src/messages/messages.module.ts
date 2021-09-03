import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { Message } from 'src/entities/message.entity'
import { User } from 'src/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Message, Room, User])],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
