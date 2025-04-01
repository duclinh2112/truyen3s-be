import { BaseEntity } from '@database/entities'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { AssetsEntity } from '../assets/assets.entity'
import { UserEntity } from '../users/entities/user.entity'

@Entity({ name: 'reviews' })
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({
    name: 'content',
    type: 'varchar'
  })
  content: string

  @Column({
    name: 'value',
    type: 'int'
  })
  value: number

  @Column({
    name: 'attachments',
    type: 'json',
    nullable: true
  })
  attachments: number[]

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  constructor(review?: Partial<ReviewEntity>) {
    super()
    Object.assign(this, review)
  }
}
