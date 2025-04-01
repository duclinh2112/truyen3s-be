import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Max, Min, ValidateIf } from 'class-validator'
import { AssetsEntity } from 'src/modules/assets/assets.entity'

export class UpdateReviewRequestDto {
  @ApiProperty({
    example: 'Bad'
  })
  content: string

  @ValidateIf((val) => val.value)
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @ApiProperty({
    example: 0
  })
  value: number

  @ApiProperty({
    example: [1]
  })
  attachments: number[]
}
