import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { CreateRoomDto } from './dto/create-room.dto'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto)
  }

  @Get()
  findAll() {
    return this.roomsService.findAll()
  }

  @Get('getByOrder/:orderId')
  async findByOrder(@Param('orderId') orderId: string) {
    const room = await this.roomsService.findOneOrCreateByOrder(orderId)

    return { room }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id)
  }
}
