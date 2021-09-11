import { IsDate, IsString, IsUUID, Length } from 'class-validator'

export class CreateMessageDto {
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
