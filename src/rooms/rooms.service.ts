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

  async subscribeUser(roomId: string, userId: string, clientId: string) {
    await this.usersRepository.update(userId, { clientId })

    const room = await this.roomsRepository.findOne(roomId, { relations: ['users'] })

    if (!!room.users.find(u => u._id === userId)) return

    room.users.push(await this.usersRepository.findOneOrFail({ _id: userId }))

    return this.roomsRepository.save(room)
  }

  remove(_id: string) {
    return this.roomsRepository.delete({ _id })
  }
}
