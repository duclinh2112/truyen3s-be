import { ApiProperty } from '@nestjs/swagger'
import { CategoryResponseDto } from 'src/modules/category/dtos/response-category.dto'

export class ChildCategoryResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  slug: string

  @ApiProperty()
  description: string

  @ApiProperty()
  category: CategoryResponseDto

  // @ApiProperty()
  // image: PhotoResponseDto
}
