import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from 'src/entities/room.entity'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateRoomDto } from './dto/create-room.dto'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async create(data: CreateRoomDto) {
    return this.roomsRepository.insert({
      orderId: data.orderId,
      users: await this.usersRepository.findByIds(data.users)
    })
  }

  async findAll() {
    const [rooms, count] = await this.roomsRepository.findAndCount()
    return { rooms, count }
  }

  findOne(id: string) {
    return this.roomsRepository.findOne(id)
  }

  // update(id: string, data: UpdateRoomDto) {
  //   return this.roomsRepository.update({ id }, data)
  // }

  remove(id: string) {
    return this.roomsRepository.delete({ id })
  }
}
