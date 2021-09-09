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
      _id: data.id,
      email: data.email,
      name: data.name,
      avatar: data.avatar
    })
  }

  update(_id: string, data: UpdateUserDto) {
    return this.usersRepository.update({ _id }, data)
  }

  remove(_id: string) {
    return this.usersRepository.delete({ _id })
  }
}
