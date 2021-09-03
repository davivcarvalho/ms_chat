import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateRoomDto {
  @IsString()
  orderId: string

  @IsArray()
  @IsOptional()
  users: string[]
}
