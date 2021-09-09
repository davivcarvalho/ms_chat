import { IsString } from 'class-validator'

type User = {
  id: string
  name: string
  avatar: string
  email: string
}

export class OnMessageDto {
  @IsString()
  text: string

  @IsString()
  user: User

  @IsString()
  room: string
}
