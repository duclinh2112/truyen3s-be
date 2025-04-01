import { BaseEntity } from '@database/entities'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'coupons' })
export class CouponEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({
    name: 'code',
    type: 'varchar',
    unique: true
  })
  code: string

  @Column({
    name: 'description',
    type: 'longtext'
  })
  description: string

  @Column({
    name: 'type',
    type: 'varchar'
  })
  type: string

  @Column({
    name: 'value',
    type: 'decimal'
  })
  value: number

  @Column({
    name: 'applicable_date',
    type: 'timestamp',
    nullable: true
  })
  applicableDate: Date

  @Column({
    name: 'expiration_date',
    type: 'timestamp',
    nullable: true
  })
  expirationDate: Date

  @Column({
    name: 'active',
    type: 'boolean',
    default: true
  })
  active: boolean

  constructor(coupon?: Partial<CouponEntity>) {
    super()
    Object.assign(this, coupon)
  }
}
