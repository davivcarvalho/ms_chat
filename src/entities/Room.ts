import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Message } from './Message'

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  orderId: string

  @OneToMany(() => Message, message => message.room)
  messages: Message[]
}
