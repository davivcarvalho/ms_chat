import { IsDate, IsString, IsUUID } from 'class-validator'

type User = {
  _id: string
  name: string
  avatar: string
}
class Message {
  @IsUUID()
  _id: string

  @IsString()
  text: string

  @IsString()
  user: User

  @IsDate()
  createdAt: Date
}

export class OnMessageDto {
  @IsString()
  room: string

  messages: Message[]
}
