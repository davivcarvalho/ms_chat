import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from 'src/entities/message.entity'
import { Repository } from 'typeorm'
import { CreateMessageDto } from './dto/create-message.dto'

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>) {}

  create(data: CreateMessageDto) {
    return this.messagesRepository.insert({
      text: data.text,
      createdBy: { _id: data.createdBy },
      room: { _id: data.room }
    })
  }

  async findAll() {
    const [messages, count] = await this.messagesRepository.findAndCount({ relations: ['room', 'createdBy'] })
    return { messages, count }
  }

  findOne(_id: string) {
    return this.messagesRepository.findOne(_id, { relations: ['room', 'createdBy'] })
  }

  remove(_id: string) {
    return this.messagesRepository.delete({ _id })
  }
}
