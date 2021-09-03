import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetRoomsService {
  constructor(@InjectRepository(Room) private roomsRepository: Repository<Room>) {}

  async getAll() {
    const [rooms, count] = await this.roomsRepository.findAndCount()

    return { rooms, count }
  }
}
