import { BaseEntity } from '@database/entities'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'authors' })
export class AuthorEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @OneToOne(() => UserEntity, (user) => user.authorProfile)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @Column({
    name: 'nickname',
    type: 'varchar',
    length: 100,
    nullable: false
  })
  nickname: string
}
