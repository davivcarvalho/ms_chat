import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Message } from 'src/entities/message.entity'
import { OnMessageDto } from './dto/on-message.dto'
import { MessagesService } from './messages.service'

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('onMessage')
  async onMessage(@MessageBody() data: OnMessageDto, @ConnectedSocket() client: Socket) {
    client.to(data.room).emit('created_message', data.messages) // Send messages to all users in room except to the sender

    await this.messagesService.createMany(data)
  }

  @SubscribeMessage('created_file_message')
  onCreatedFileMessage(@MessageBody() message: Message, @ConnectedSocket() client: Socket) {
    client.to(message.room._id).emit('created_message', [message])
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
