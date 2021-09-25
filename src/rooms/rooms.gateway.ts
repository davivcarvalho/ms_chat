import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { OnEnterToRoomDto } from './dto/onEnterToRoom.dto'
import { RoomsService } from './rooms.service'

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer()
  server: Server

  constructor(private roomsService: RoomsService) {}

  @SubscribeMessage('enterToRoom')
  async onEnterToRoom(@MessageBody() data: OnEnterToRoomDto, @ConnectedSocket() client: Socket) {
    await client.join(data.roomId)

    await this.roomsService.subscribeUser(data.roomId, data.userId, client.id)

    console.log(`[Room] - Client connected to room: ${data.roomId}`)
  }
}
