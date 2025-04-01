import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class CreateChapterDto {
  @IsNotEmpty({ message: ErrorMessage.NOT_EMPTY })
  @ApiProperty({
    example: 1
  })
  stt: number

  @IsNotEmpty()
  @MaxLength(200, { message: ErrorMessage.NAME_MAX_LENGTH })
  @ApiProperty({
    example: 'Chương 1: Em là của anh'
  })
  name: string

  @IsNotEmpty()
  @ApiProperty({ example: 'Chương 1: Em là của anh' })
  content: string

  @IsNotEmpty()
  @ApiProperty({
    example: 1
  })
  comic: number
}
