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

  async findOneOrCreateByOrder(orderId: string) {
    // const room = await this.roomsRepository.findOne({ orderId }, { relations: ['messages', 'messages.user'] })
    const room = await this.roomsRepository
      .createQueryBuilder('order')
      .where({ orderId })
      .leftJoinAndSelect('order.messages', 'messages')
      .leftJoinAndSelect('messages.user', 'user')
      .addOrderBy('messages.createdAt', 'DESC')
      .getOne()

    if (room) return room

    return this.roomsRepository.save(
      this.roomsRepository.create({
        orderId,
        messages: []
      })
    )
  }

  // update(id: string, data: UpdateRoomDto) {
  //   return this.roomsRepository.update({ id }, data)
  // }

  remove(_id: string) {
    return this.roomsRepository.delete({ _id })
  }
}
