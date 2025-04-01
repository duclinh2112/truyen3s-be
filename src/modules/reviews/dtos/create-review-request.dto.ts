import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Max, Min } from 'class-validator'

export enum ReviewTypes {
  BANNER = 'BANNER',
  IMAGE_BANNER = 'IMAGE_BANNER'
}

export class CreateReviewRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1
  })
  product: number

  @IsNotEmpty()
  @ApiProperty({
    example: 'Source vip pro'
  })
  content: string

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @ApiProperty({
    example: 5
  })
  value: number

  @ApiProperty({
    example: [1]
  })
  attachments: number[]
}
