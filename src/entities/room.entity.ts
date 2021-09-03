import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Message } from './message.entity'
import { User } from './user.entity'

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  orderId: string

  @OneToMany(() => Message, message => message.room)
  messages: Message[]

  @ManyToMany(() => User, user => user.rooms)
  @JoinTable()
  users: User[]
}
