import { IsString } from 'class-validator'

type User = {
  _id: string
  name: string
  avatar: string
}
export class OnMessageDto {
  @IsString()
  text: string

  @IsString()
  user: User

  @IsString()
  room: string
}
