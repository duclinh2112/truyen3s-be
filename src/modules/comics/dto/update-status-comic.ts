import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class UpdateStatusComicDto {
  @IsOptional()
  @ApiProperty({ example: false })
  isHot: boolean

  @IsOptional()
  @ApiProperty({ example: false })
  isRecommend: boolean

  @IsOptional()
  @ApiProperty({ example: false })
  isFull: boolean
}
