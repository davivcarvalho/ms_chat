import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from 'src/entities/message.entity'
import { Repository } from 'typeorm'
import { CreateMessageDto } from './dto/create-message.dto'
import { OnMessageDto } from './dto/on-message.dto'

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>) {}

  create(data: CreateMessageDto) {
    return this.messagesRepository.insert({
      _id: data._id,
      text: data.text,
      user: { _id: data.user },
      room: { _id: data.room },
      createdAt: data.createdAt
    })
  }

  createMany(data: OnMessageDto) {
    return this.messagesRepository.insert(data.messages.map(message => ({ ...message, room: { _id: data.room } })))
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
