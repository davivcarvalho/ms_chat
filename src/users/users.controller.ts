import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user_created')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @EventPattern('user_updated')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto)
  }

  @EventPattern('user_removed')
  remove(@Payload() id: string) {
    return this.usersService.remove(id)
  }
}
