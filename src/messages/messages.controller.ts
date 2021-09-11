import { Controller, Get, Post, Body, Param, Delete, Req, Res } from '@nestjs/common'
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

  @Post('audio')
  async createAudioMessage(@Req() request: any, @Res() reponse: any) {
    return await this.uploadHelper.uploadFile(request, reponse)
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
