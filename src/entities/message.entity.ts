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

  @Column()
  image?: string

  @Column()
  video?: string

  @Column()
  audio?: string

  @Column()
  system?: boolean

  @Column()
  sent?: boolean

  @Column()
  received?: boolean

  @Column()
  pending?: boolean
}

// _id: string | number
// text: string
// createdAt: Date | number
// user: User
// image?: string
// video?: string
// audio?: string
// system?: boolean
// sent?: boolean
// received?: boolean
// pending?: boolean
