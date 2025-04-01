import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateChapterDto } from './create-chapter.dto'
import { IsOptional, MaxLength } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class UpdateChapterDto {
  @IsOptional()
  @MaxLength(200, { message: ErrorMessage.NAME_MAX_LENGTH })
  @ApiProperty({
    example: 'Chương 1: Em là của anh'
  })
  name: string

  @IsOptional()
  @ApiProperty({ example: 'Chương 1: Em là của anh' })
  content: string
}
