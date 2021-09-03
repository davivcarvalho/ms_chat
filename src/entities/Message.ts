import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './Room'
import { User } from './User'

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  body: string

  @ManyToOne(() => Room, room => room.messages)
  room: Room

  @OneToOne(() => User)
  @JoinColumn()
  createdBy: User

  @CreateDateColumn()
  createdAt: Date
}
