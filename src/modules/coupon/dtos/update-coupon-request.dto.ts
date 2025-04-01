import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, MaxLength, ValidateIf } from 'class-validator'
import { CouponTypes } from './create-coupon-request.dto'

export class UpdateCouponRequestDto {
  @ValidateIf((val) => val.name)
  @MaxLength(100)
  @ApiProperty({
    example: 'DISOUNT50K'
  })
  code: string

  @ApiProperty({
    example: 'Coupon discount 50k'
  })
  description: string

  @ValidateIf((val) => val.name)
  @IsEnum(CouponTypes)
  @ApiProperty({
    example: 'VALUE'
  })
  type: string

  @ApiProperty({
    example: 50000
  })
  value: number

  @ApiProperty({
    example: new Date()
  })
  applicableDate: Date

  @ApiProperty({
    example: new Date()
  })
  expirationDate: Date

  @ApiProperty({
    example: false
  })
  active: boolean
}
