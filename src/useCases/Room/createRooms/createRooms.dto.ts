import { IsString } from 'class-validator'

export class CreateRoomsDto {
  @IsString()
  orderId: string
}
