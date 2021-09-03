import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { Repository } from 'typeorm'
import { CreateRoomsDto } from './createRooms.dto'

@Injectable()
export class CreateRoomsService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  createOne(data: CreateRoomsDto) {
    return this.roomRepository.insert({ orderId: data.orderId })
  }
}
