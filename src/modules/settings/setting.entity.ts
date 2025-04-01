import { BaseEntity } from '@database/entities'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { AssetsEntity } from '../assets/assets.entity'
import { ICreateSettingAction } from 'src/interfaces/interfaces/setting-action.interface'

@Entity({ name: 'settings' })
export class SettingEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({
    name: 'type',
    type: 'varchar'
  })
  type: string

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true
  })
  name: string

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true
  })
  description: string

  @Column({
    name: 'url',
    type: 'varchar',
    nullable: true
  })
  url: string

  @Column({
    name: 'actions',
    type: 'json',
    nullable: true
  })
  actions: ICreateSettingAction[]

  @ManyToOne(() => AssetsEntity, (assets) => assets.settings)
  @JoinColumn({ name: 'image_id' })
  image: AssetsEntity

  constructor(setting?: Partial<SettingEntity>) {
    super()
    Object.assign(this, setting)
  }
}
