import { ApiProperty } from '@nestjs/swagger'
import { PhotoResponseDto } from 'src/modules/assets/dtos/photo.response.dto'
import { CategoryResponseDto } from 'src/modules/category/dtos/response-category.dto'
import { ChildCategoryEntity } from 'src/modules/child.categories/entities/child.category.entity'
import { UserResponseDto } from 'src/modules/users/dtos'

export class ResponseComicDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  slug: string

  @ApiProperty()
  description: string

  @ApiProperty()
  price: number

  @ApiProperty()
  isHot: boolean

  @ApiProperty()
  isRecommend: boolean

  @ApiProperty()
  isFull: boolean

  @ApiProperty()
  view: number

  @ApiProperty()
  author: UserResponseDto

  @ApiProperty()
  image: PhotoResponseDto

  @ApiProperty()
  category: CategoryResponseDto

  @ApiProperty()
  childCategories: ChildCategoryEntity[]
}
