import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne
} from 'typeorm'
import { BaseEntity } from 'src/database/entities/base.entity'
import { PermissionEntity } from '../../permissions/permission.entity'
import { RoleEntity } from '../../roles/role.entity'
import { UserStatus } from '../../../interfaces/enums/user-status.enum'
import { ReviewEntity } from 'src/modules/reviews/review.entity'
import { AuthorEntity } from 'src/modules/authors/entities/author.entity'
import { ComicsEntity } from 'src/modules/comics/entities/comic.entity'

@Entity({ schema: 'admin', name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 100,
    nullable: false
  })
  fullName: string

  @Column({
    name: 'photo_id',
    type: 'int',
    nullable: true
  })
  photoId: number

  @Column({
    name: 'birthday',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  birthday: Date

  @Column({
    name: 'city',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  city: string

  @Column({
    name: 'district',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  district: string

  @Column({
    name: 'wards',
    type: 'varchar',
    length: 100,
    nullable: true
  })
  wards: string

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: true
  })
  address: string

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 10,
    nullable: true,
    unique: true
  })
  phone: string

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: true,
    unique: true
  })
  email: string

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: true
  })
  password: string

  @Column({
    name: 'is_super_user',
    type: 'boolean',
    nullable: false,
    default: false
  })
  isSuperUser: boolean

  @Column({
    name: 'status',
    type: 'varchar',
    nullable: false,
    default: UserStatus.Active
  })
  status: string

  @Column({
    name: 'provider',
    type: 'varchar',
    nullable: true,
    default: 'credentials'
  })
  provider: string

  @Column({
    name: 'provider_account_id',
    type: 'varchar',
    nullable: true
  })
  providerAccountId: string

  @OneToMany(() => ReviewEntity, (reviews) => reviews.user)
  @JoinColumn({ name: 'review_id' })
  reviews: ReviewEntity[]

  @ManyToMany(() => RoleEntity, (role) => role.id, {
    lazy: true,
    cascade: true
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  roles: Promise<RoleEntity[]>

  @ManyToMany(() => PermissionEntity, (permission) => permission.id, {
    lazy: true,
    cascade: true
  })
  @JoinTable({
    name: 'users_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  permissions: Promise<PermissionEntity[]>

  @OneToOne(() => AuthorEntity, (author) => author.user)
  authorProfile: AuthorEntity

  @OneToMany(() => ComicsEntity, (comics) => comics.author)
  comics: ComicsEntity

  constructor(user?: Partial<UserEntity>) {
    super()
    Object.assign(this, user)
  }
}
