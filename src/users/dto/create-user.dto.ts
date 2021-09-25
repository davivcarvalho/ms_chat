import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  id: string

  @IsEmail()
  email: string

  @IsString()
  name: string

  @IsString()
  notificationToken?: string

  @IsString()
  avatar: string
}
