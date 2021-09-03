import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column()
  avatar: string

  @ManyToMany(() => Room, room => room.users)
  rooms: Room[]
}
