import { BaseEntity } from '@database/entities'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { UserEntity } from '../users/entities/user.entity'

@Entity({ name: 'wishlist' })
export class WishlistEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({
    name: 'comic_ids',
    type: 'json'
  })
  comicIds: string[]

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  constructor(setting?: Partial<WishlistEntity>) {
    super()
    Object.assign(this, setting)
  }
}
