import { IsString, IsUUID, Length } from 'class-validator'

export class CreateMessageDto {
  @IsString()
  @Length(1, 100)
  body: string

  @IsUUID()
  room: string

  @IsUUID()
  createdBy: string
}
