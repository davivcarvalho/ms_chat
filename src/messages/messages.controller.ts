import { Controller, Get, Post, Param, Delete, Req } from '@nestjs/common'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  async create(@Req() request: any) {
    const result = await this.messagesService.createWithFile(request)
    return result
  }

  @Get()
  findAll() {
    return this.messagesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id)
  }
}
