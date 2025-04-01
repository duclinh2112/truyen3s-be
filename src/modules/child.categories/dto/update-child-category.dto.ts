import { CategoryExist } from '@common/validations/category/category.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { CategoryEntity } from 'src/modules/category/category.entity'

export class UpdateChildCategoryDto {
  @IsOptional()
  @MaxLength(100, { message: ErrorMessage.NAME_MAX_LENGTH })
  @ApiProperty({ example: 'Hôn nhân' })
  name: string

  @ApiProperty({ example: 'Hôn nhân' })
  description: string

  @IsNotEmpty()
  @CategoryExist()
  @ApiProperty({
    example: 1
  })
  category: CategoryEntity
}
