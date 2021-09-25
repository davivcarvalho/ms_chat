import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from 'src/entities/message.entity'
import { Repository } from 'typeorm'
import { CreateMessageDto } from './dto/create-message.dto'
import { OnMessageDto } from './dto/on-message.dto'
import { v4 as uuid } from 'uuid'
import { Room } from 'src/entities/room.entity'
import { NotificationService } from 'src/helpers/notification.provider'
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    @InjectRepository(Room) private roomsRepository: Repository<Room>
  ) {}

  create(data: CreateMessageDto) {
    return this.messagesRepository.save(
      this.messagesRepository.create({
        _id: data._id,
        text: data.text,
        user: { _id: data.user },
        room: { _id: data.room },
        createdAt: data.createdAt
      })
    )
  }

  async createFileMessage(data: any) {
    const body = {} as {
      user: { _id: string; avatar: string; email: string }
      roomId: string
      file: { filename: string; mimetype: string }
    }

    if (!data.user || !data.roomId || !data.file) throw new HttpException('Missing body to create message', 400)

    Reflect.set(body, 'user', JSON.parse(data.user))
    Reflect.set(body, 'roomId', data.roomId)
    Reflect.set(body, 'file', data.file)

    const messageData = {
      _id: uuid(),
      text: '',
      user: body.user,
      room: { _id: body.roomId },
      createdAt: new Date()
    }

    if (body.file.mimetype.includes('audio')) Reflect.set(messageData, 'audio', `/audios/${body.file.filename}`)
    if (body.file.mimetype.includes('image')) Reflect.set(messageData, 'image', `/images/${body.file.filename}`)
    if (body.file.mimetype.includes('video')) Reflect.set(messageData, 'video', `/videos/${body.file.filename}`)

    return this.messagesRepository.save(this.messagesRepository.create(messageData))
  }

  async createMany(data: OnMessageDto) {
    const result = await this.messagesRepository.insert(
      data.messages.map(message => ({ ...message, room: { _id: data.room } }))
    )

    const room = await this.roomsRepository.findOne(data.room, { relations: ['users'] })

    const notificationService = new NotificationService()

    notificationService.notify(
      room.users.map(user => user.notificationToken),
      'Nova mensagem',
      'Tem mensagem nova pra você no chat.'
    )

    return result
  }

  async findAll() {
    const [messages, count] = await this.messagesRepository.findAndCount({ relations: ['room', 'user'] })
    return { messages, count }
  }

  findOne(_id: string) {
    return this.messagesRepository.findOne(_id, { relations: ['room', 'user'] })
  }

  remove(_id: string) {
    return this.messagesRepository.delete({ _id })
  }
}
