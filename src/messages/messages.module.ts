import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { Message } from 'src/entities/message.entity'
import { User } from 'src/entities/user.entity'
import { MessagesGateway } from './messages.gateway'
import { UploadHelper } from 'src/helpers/fileUpload.helper'

@Module({
  imports: [TypeOrmModule.forFeature([Message, Room, User])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway, UploadHelper]
})
export class MessagesModule {}
