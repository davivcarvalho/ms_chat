import { IsString } from 'class-validator'

export class OnEnterToRoomDto {
  @IsString()
  roomId: string

  @IsString()
  userId: string
}
