import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'

@Controller()
export class ChatController {
  @EventPattern('testando_ms')
  getHello(): string {
    console.log('veio')
    return '{}'
  }
}
