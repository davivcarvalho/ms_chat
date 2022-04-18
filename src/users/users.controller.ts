import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('chat.users.created')
  async create(@Payload() body) {
    const data = body.value as CreateUserDto

    return this.usersService.create(data)
  }

  @EventPattern('chat.users.updated')
  async update(@Payload() body) {
    const data = body.value as UpdateUserDto

    return this.usersService.update(data.id, data)
  }
}
