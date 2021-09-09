import { Column, Entity, Index, ManyToMany, PrimaryColumn } from 'typeorm'
import { Room } from './room.entity'

@Entity()
export class User {
  @PrimaryColumn({ unique: true, generated: false })
  _id: string

  @Column()
  @Index({ unique: true })
  email: string

  @Column()
  name: string

  @Column()
  avatar: string

  @ManyToMany(() => Room, room => room.users)
  rooms: Room[]
}
