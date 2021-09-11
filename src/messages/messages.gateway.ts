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
    client.to(data.room).emit('created_message', data.messages) // Send messages to all users in room except to the sender

    this.messagesService.createMany(data)
  }

  @SubscribeMessage('user_is_typing')
  onUserTyping(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    client.to(roomId).emit('user_is_typing')
  }

  @SubscribeMessage('user_isnt_typing')
  onUserStopTyping(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    client.to(roomId).emit('user_isnt_typing')
  }
}
