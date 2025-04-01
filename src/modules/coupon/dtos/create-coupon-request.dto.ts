import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator'

export enum CouponTypes {
  VALUE = 'VALUE',
  PERCENT = 'PERCENT'
}

export class CreateCouponRequestDto {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    example: 'DISOUNT10K'
  })
  code: string

  @ApiProperty({
    example: 'Coupon discount 10k'
  })
  description: string

  @IsNotEmpty()
  @IsEnum(CouponTypes)
  @ApiProperty({
    example: 'VALUE'
  })
  type: string

  @IsNotEmpty()
  @ApiProperty({
    example: 50000
  })
  value: number

  @IsNotEmpty()
  @ApiProperty({
    example: new Date()
  })
  applicableDate: Date

  @IsNotEmpty()
  @ApiProperty({
    example: new Date()
  })
  expirationDate: Date

  @ApiProperty({
    example: true
  })
  active: boolean
}
