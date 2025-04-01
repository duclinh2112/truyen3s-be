import { AssetExist } from '@common/validations/assets/asset.decorator'
import { CategoryExist } from '@common/validations/category/category.decorator'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min
} from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { AssetsEntity } from 'src/modules/assets/assets.entity'
import { CategoryEntity } from 'src/modules/category/category.entity'

export class UpdateComicDto {
  @IsOptional()
  @MaxLength(200, { message: ErrorMessage.NAME_MAX_LENGTH })
  @ApiProperty({
    example: 'Em là của anh'
  })
  name: string

  @IsOptional()
  @ApiProperty({ example: 'Em là của anh' })
  description: string

  @IsNotEmpty()
  @AssetExist()
  @ApiProperty({
    example: 1
  })
  image: AssetsEntity

  @IsNotEmpty()
  @CategoryExist()
  @ApiProperty({
    example: 1
  })
  category: CategoryEntity

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
