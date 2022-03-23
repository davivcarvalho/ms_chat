import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user_created')
  async create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @EventPattern('user_updated')
  async update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto)
  }
}
