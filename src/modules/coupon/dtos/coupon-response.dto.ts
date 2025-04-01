import { ApiProperty } from '@nestjs/swagger'

export class CouponResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  code: string

  @ApiProperty()
  description: string

  @ApiProperty()
  type: string

  @ApiProperty()
  value: number

  @ApiProperty()
  applicableDate: Date

  @ApiProperty()
  expirationDate: Date

  @ApiProperty()
  active: boolean
}
