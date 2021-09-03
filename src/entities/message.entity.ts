import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room.entity'
import { User } from './user.entity'

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  text: string

  @ManyToOne(() => Room, room => room.messages)
  room: Room

  @ManyToOne(() => User)
  createdBy: User

  @CreateDateColumn()
  createdAt: Date
}
