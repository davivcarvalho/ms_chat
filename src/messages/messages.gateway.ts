import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { OnMessageDto } from './dto/on-message.dto'
import { MessagesService } from './messages.service'

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('onMessage')
  onMessage(@MessageBody() data: OnMessageDto) {
    this.server.emit(`${data.room}/onMessage`, data)

    console.log('chegou', data)

    this.messagesService.create({
      text: data.text,
      createdBy: data.user._id,
      room: data.room
    })
  }
}
