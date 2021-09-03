import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  create(data: CreateUserDto) {
    return this.usersRepository.insert({
      email: data.email,
      name: data.name,
      avatar: data.avatar
    })
  }

  update(id: string, data: UpdateUserDto) {
    return this.usersRepository.update({ id }, data)
  }

  remove(id: string) {
    return this.usersRepository.delete({ id })
  }
}
