import { Controller, Get, Param, StreamableFile } from '@nestjs/common'
import { createReadStream } from 'fs'
import { join } from 'path'
import { storagePath } from './fileUpload.helper'

@Controller('storage')
export class FileStreamController {
  @Get(':type/:name')
  getFile(@Param('name') name: string, @Param('type') type: string) {
    const path = join(storagePath, type, name)
    const file = createReadStream(path)
    return new StreamableFile(file)
  }
}
