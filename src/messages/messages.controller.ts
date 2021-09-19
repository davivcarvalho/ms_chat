import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UploadHelper } from 'src/helpers/fileUpload.helper'

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService, private uploadHelper: UploadHelper) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto)
  }

  @Post('file')
  async createAudioMessage(@Req() request: any) {
    const fields = await this.uploadHelper.uploadFile(request)
    const message = await this.messagesService.createFileMessage(fields)

    return { message }
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
