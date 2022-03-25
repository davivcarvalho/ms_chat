import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'

@Injectable()
export class FileStorageService {
  private s3 = new S3({
    credentials: {
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY
    }
  })

  async handle(file: ReadableStream, filename: string, mimetype: string) {
    const type = mimetype.split('/')[0]
    const result = await this.s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${type}/${Date.now()}-${filename}`,
        Body: file,
        ContentType: mimetype,
        ContentDisposition: 'inline'
      })
      .promise()

    return { type, url: result.Location }
  }
}
