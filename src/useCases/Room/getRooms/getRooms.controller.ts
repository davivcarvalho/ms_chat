import { Controller, Get } from '@nestjs/common'
import { GetRoomsService } from './getRooms.service'

@Controller('chats')
export class GetRoomsController {
  constructor(private getRoomsService: GetRoomsService) {}

  @Get('/')
  async getRooms() {
    return this.getRoomsService.getAll()
  }
}
