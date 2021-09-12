import { Injectable } from '@nestjs/common'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

@Injectable()
export class UploadHelper {
  uploadFile(request: any) {
    return new Promise<any>(async (resolve, reject) => {
      const body = {}

      if (!request.isMultipart()) reject('Is not a multpart request')

      const busboy = await request.multipart(this.handler, onEnd)

      busboy.on('file', (fieldname, file, filename, enconding, mimetype) => {
        body[fieldname] = { filename, mimetype }
      })

      busboy.on('field', function (key: any, value: any) {
        body[key] = value
      })

      async function onEnd(err: any) {
        if (err) reject(err)
      }

      busboy.on('finish', () => {
        resolve(body)
      })
    })
  }

  async handler(field: string, file: any, filename: string, encoding: string, mimetype: string): Promise<void> {
    let path = './storage/'

    if (mimetype.includes('audio')) path += 'audios'
    if (mimetype.includes('video')) path += 'videos'
    if (mimetype.includes('image')) path += 'images'

    const writeStream = createWriteStream(`${path}/${filename}`)
    try {
      await pipeline(file, writeStream)
    } catch (err) {
      console.error('Pipeline failed', err)
    }
  }
}
