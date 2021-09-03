import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CreateRoomsService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  createOne(data)
}
