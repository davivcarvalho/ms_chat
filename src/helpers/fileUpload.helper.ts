import { Injectable } from '@nestjs/common'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { pipeline } from 'stream/promises'
import { homedir } from 'os'

export const storagePath = `${homedir}/storage`

@Injectable()
export class UploadHelper {
  constructor() {
    this.ensurePathsExists()
  }

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
    let path = storagePath

    if (mimetype.includes('audio')) path += '/audios'
    if (mimetype.includes('video')) path += '/videos'
    if (mimetype.includes('image')) path += '/images'

    const writeStream = createWriteStream(`${path}/${filename}`)
    try {
      await pipeline(file, writeStream)
    } catch (err) {
      console.error('Pipeline failed', err)
    }
  }

  ensurePathsExists() {
    !existsSync(`${storagePath}/videos`) && mkdirSync(`${storagePath}/videos`, { recursive: true })
    !existsSync(`${storagePath}/images`) && mkdirSync(`${storagePath}/images`, { recursive: true })
    !existsSync(`${storagePath}/audios`) && mkdirSync(`${storagePath}/audios`, { recursive: true })
  }
}
