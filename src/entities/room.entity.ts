import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Message } from './message.entity'
import { User } from './user.entity'

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column()
  @Index({ unique: true })
  orderId: string

  @OneToMany(() => Message, message => message.room)
  messages: Message[]

  @ManyToMany(() => User, user => user.rooms)
  @JoinTable()
  users?: User[]
}
