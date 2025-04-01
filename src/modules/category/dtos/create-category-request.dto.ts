import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class CreateCategoryRequestDto {
  @IsNotEmpty({ message: ErrorMessage.NOT_EMPTY })
  @MaxLength(100, { message: ErrorMessage.NAME_MAX_LENGTH })
  @ApiProperty({ example: 'Tiểu thuyết' })
  name: string

  @ApiProperty({ example: 'Tiểu thuyết' })
  description: string

  // @IsNotEmpty({ message: ErrorMessage.IMAGE_NOT_EMPTY })
  // @AssetExist()
  // @ApiProperty({ example: 1 })
  // image: number
}
