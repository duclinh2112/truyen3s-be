import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min
} from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class CreateComicDto {
  @IsNotEmpty()
  @MaxLength(200, { message: ErrorMessage.NAME_MAX_LENGTH })
  @ApiProperty({
    example: 'Em là của anh'
  })
  name: string

  @IsNotEmpty()
  @ApiProperty({ example: 'Em là của anh' })
  description: string

  @IsNotEmpty()
  @ApiProperty({
    example: 1
  })
  image: number

  @IsNotEmpty()
  @ApiProperty({
    example: 1
  })
  category: number

  @IsOptional()
  @Min(0)
  @ApiProperty({ example: 500000 })
  price: number

  @IsOptional()
  @ApiProperty({ example: false })
  isHot: boolean

  @IsOptional()
  @ApiProperty({ example: false })
  isRecommend: boolean

  @IsOptional()
  @ApiProperty({ example: false })
  isFull: boolean

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ example: [1, 2, 3] })
  childCategoryIds: number[]
}
