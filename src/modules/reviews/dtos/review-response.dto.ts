import { ApiProperty } from '@nestjs/swagger'

export class ReviewResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  content: string

  @ApiProperty()
  value: number

  @ApiProperty()
  attachments?: number[]
}
