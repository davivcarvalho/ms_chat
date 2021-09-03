import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { GetRoomsService } from './getRooms.service'

@Controller('')
export class GetRoomsController {
  constructor(private getRoomsService: GetRoomsService) {}

  @MessagePattern({ cmd: 'getRooms' })
  async getRooms() {
    return this.getRoomsService.getAll()
  }
}
