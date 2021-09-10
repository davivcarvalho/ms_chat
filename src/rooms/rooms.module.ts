import { Module } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { RoomsController } from './rooms.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { User } from 'src/entities/user.entity'
import { Message } from 'src/entities/message.entity'
import { RoomsGateway } from './rooms.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([Room, User, Message])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway]
})
export class RoomsModule {}
