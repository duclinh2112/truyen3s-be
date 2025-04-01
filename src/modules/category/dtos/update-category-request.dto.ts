import { AssetExist } from '@common/validations/assets/asset.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MaxLength } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class UpdateCategoryRequestDto {
  @IsOptional()
  @MaxLength(100, { message: ErrorMessage.NAME_MAX_LENGTH })
  @ApiProperty({ example: 'Tiểu thuyết' })
  name: string

  @ApiProperty({ example: 'Tiểu thuyết' })
  description: string

  // @IsOptional()
  // @AssetExist()
  // @ApiProperty({ example: 1 })
  // image: number
}
