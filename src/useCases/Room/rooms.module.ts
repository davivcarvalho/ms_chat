import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from 'src/entities/message.entity'
import { Room } from 'src/entities/room.entity'
import { User } from 'src/entities/user.entity'
import { GetRoomsController } from './getRooms/getRooms.controller'
import { GetRoomsService } from './getRooms/getRooms.service'

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message, User])],
  controllers: [GetRoomsController],
  providers: [GetRoomsService]
})
export class RoomsModule {}
