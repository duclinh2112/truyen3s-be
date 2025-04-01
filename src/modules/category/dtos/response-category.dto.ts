import { ApiProperty } from '@nestjs/swagger'
import { PhotoResponseDto } from 'src/modules/assets/dtos/photo.response.dto'

export class CategoryResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  slug: string

  @ApiProperty()
  description: string

  // @ApiProperty()
  // image: PhotoResponseDto
}
