import { Controller, Get } from '@nestjs/common'
import { Payload } from '@nestjs/microservices'
import { CreateRoomsDto } from './createRooms.dto'
import { CreateRoomsService } from './createRooms.service'

@Controller('rooms')
export class CreateRoomsController {
  constructor(private createRoomsService: CreateRoomsService) {}

  @Get('/')
  async handle(@Payload() data: CreateRoomsDto) {
    console.log(data)

    // await this.createRoomsService.createOne(data)

    return null
  }
}
