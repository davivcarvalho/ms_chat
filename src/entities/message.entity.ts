import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Room } from './room.entity'
import { User } from './user.entity'

@Entity()
export class Message {
  @PrimaryColumn('uuid', { generated: false })
  _id: string

  @Column()
  text: string

  @ManyToOne(() => Room, room => room.messages)
  room: Room

  @ManyToOne(() => User)
  user: User

  @Column()
  createdAt: Date
}
