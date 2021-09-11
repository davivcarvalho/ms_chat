import { HttpException, BadRequestException, Injectable } from '@nestjs/common'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

@Injectable()
export class UploadHelper {
  async uploadFile(request: any, reply: any): Promise<any> {
    if (!request.isMultipart()) {
      reply.send(new BadRequestException('Request is not multipart'))
      return
    }

    const mp = await request.multipart(this.handler, onEnd)
    // mp.on('field', function (key: any, value: any) {
    //   console.log('form-data', key, value)
    // })
    async function onEnd(err: any) {
      if (err) {
        reply.send(new HttpException('Internal server error', 500))
        return
      }
      reply.code(200).send('Data uploaded successfully')
    }
  }

  async handler(field: string, file: any, filename: string, encoding: string, mimetype: string): Promise<void> {
    console.log(field, filename, mimetype)

    let path = './storage/'

    if (mimetype.includes('audio')) path += 'audios'

    const writeStream = createWriteStream(`${path}/${filename}`)
    try {
      await pipeline(file, writeStream)
    } catch (err) {
      console.error('Pipeline failed', err)
    }
  }
}
