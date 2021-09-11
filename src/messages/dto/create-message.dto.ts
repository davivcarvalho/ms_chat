import { IsDate, IsString, IsUUID, Length } from 'class-validator'

export class CreateMessageDto {
  @IsUUID()
  _id: string

  @IsString()
  @Length(1, 100)
  text: string

  @IsUUID()
  room: string

  @IsUUID()
  user: string

  @IsDate()
  createdAt: Date
}
