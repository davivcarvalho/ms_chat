import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { OnMessageDto } from './dto/on-message.dto'
import { MessagesService } from './messages.service'

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('onMessage')
  onMessage(@MessageBody() data: OnMessageDto, @ConnectedSocket() client: Socket) {
    client.to(data.room).emit('created_message', data.messages) // Send messages to all users in room except the sender

    this.messagesService.createMany(data)
  }
}
