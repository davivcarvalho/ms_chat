import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  id: string

  @IsString()
  username: string

  @IsString()
  name: string

  @IsString()
  notificationToken?: string

  @IsString()
  avatar: string
}
