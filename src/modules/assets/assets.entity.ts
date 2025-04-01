import { BaseEntity } from '@database/entities'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { SettingEntity } from '../settings/setting.entity'
import { UserEntity } from '../users/entities/user.entity'
import { EAssetType } from './dtos/upload-photo.response.dto'

@Entity({ schema: 'admin', name: 'assets' })
export class AssetsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({
    name: 'name',
    type: 'varchar'
  })
  name: string

  @Column({
    name: 'original_name',
    type: 'varchar'
  })
  originalname: string

  @Column({
    name: 'type',
    type: 'varchar'
  })
  type: string

  @Column({
    name: 'asset_type',
    type: 'varchar',
    nullable: true
  })
  assetType: EAssetType

  @Column({
    name: 'active',
    type: 'boolean',
    default: true
  })
  active: boolean

  @OneToMany(() => SettingEntity, (settings) => settings.image)
  settings: SettingEntity[]

  // @OneToMany(() => CategoryEntity, (categories) => categories.image)
  // categories: CategoryEntity[]

  // @OneToMany(
  //   () => ChildCategoryEntity,
  //   (childCategories) => childCategories.image
  // )
  // childCategories: ChildCategoryEntity[]

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  constructor(assets?: Partial<AssetsEntity>) {
    super()
    Object.assign(this, assets)
  }
}
