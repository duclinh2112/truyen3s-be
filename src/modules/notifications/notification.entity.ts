import { BaseEntity } from '@database/entities'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { UserEntity } from '../users/entities/user.entity'

@Entity({ name: 'notifications' })
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({
    name: 'type',
    type: 'varchar'
  })
  type: string

  @Column({
    name: 'content',
    type: 'varchar'
  })
  content: string

  @Column({
    name: 'is_read',
    type: 'boolean'
  })
  isRead: boolean

  @Column({
    name: 'value',
    type: 'varchar'
  })
  value: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  constructor(notification?: Partial<NotificationEntity>) {
    super()
    Object.assign(this, notification)
  }
}
