import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class AddWishlistRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1
  })
  id: number
}
