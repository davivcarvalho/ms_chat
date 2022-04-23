import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from 'src/entities/message.entity'
import { Repository } from 'typeorm'
import { CreateMessageDto } from './dto/create-message.dto'
import { OnMessageDto } from './dto/on-message.dto'
import { v4 as uuid } from 'uuid'
import { Room } from 'src/entities/room.entity'
import { NotificationsService } from 'src/helpers/notifications.provider'
import { FileStorageService } from 'src/helpers/fileStorage.provider'
import { User } from 'src/entities/user.entity'
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    private fileStorageService: FileStorageService
  ) {}

  create(data: CreateMessageDto) {
    return this.messagesRepository.save(
      this.messagesRepository.create({
        ...data,
        _id: data._id,
        text: data.text,
        user: { _id: data.user },
        room: { _id: data.room },
        createdAt: data.createdAt
      })
    )
  }

  async createWithFile(body: any) {
    const message = {} as CreateMessageDto

    if (!body.isMultipart()) throw new BadRequestException('Invalid payload type!')

    function onEnd(error: any) {
      if (error) throw new BadRequestException(error)
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const busboy = await body.multipart(() => {}, onEnd)

    const uploadFile = new Promise<void>(async (resolve, reject) => {
      busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        try {
          const uploadResult = await this.fileStorageService.handle(file, filename, mimetype)

          message[uploadResult.type] = uploadResult.url

          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })

    const parseFields = new Promise<void>((resolve, reject) => {
      busboy.on('field', function (key: any, value) {
        if (key === 'user') {
          message[key] = JSON.parse(value)._id
          return
        }
        message[key] = value
      })

      busboy.on('finish', () => {
        resolve()
      })
    })

    if (!message._id) message._id = uuid()
    if (!message.createdAt) message.createdAt = new Date()

    try {
      await Promise.all([uploadFile, parseFields])
    } catch (error) {
      throw new BadRequestException(error)
    }

    return this.create(message)
  }

  async createMany(data: OnMessageDto) {
    const result = await this.messagesRepository.insert(
      data.messages.map(message => ({ ...message, room: { _id: data.room } }))
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

  async notifyUsers(connectedClients: string[], roomId: string) {
    const disconnectedRoomUsers = (
      await this.roomsRepository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.users', 'user', 'user.clientId NOT IN (:...clients)', {
          clients: connectedClients
        })
        .where('room._id = :id', { id: roomId })
        .getOneOrFail()
    ).users

    const notificationsService = new NotificationsService()

    notificationsService.notify(
      disconnectedRoomUsers.map(u => u.notificationToken),
      'Nova mensagem',
      'Tem nova mensagem para você!'
    )
  }
}
