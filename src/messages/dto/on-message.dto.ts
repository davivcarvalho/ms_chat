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

  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
}

export class OnMessageDto {
  @IsString()
  room: string

  messages: Message[]
}
