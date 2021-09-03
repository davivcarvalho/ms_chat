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
      body: data.body,
      createdBy: { id: data.createdBy },
      room: { id: data.room }
    })
  }

  async findAll() {
    const [messages, count] = await this.messagesRepository.findAndCount({ relations: ['room', 'createdBy'] })
    return { messages, count }
  }

  findOne(id: string) {
    return this.messagesRepository.findOne(id, { relations: ['room', 'createdBy'] })
  }

  remove(id: string) {
    return this.messagesRepository.delete({ id })
  }
}
