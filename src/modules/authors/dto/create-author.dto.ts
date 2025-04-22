import { Unique } from '@common/validations/unique/unique'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, Validate } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { AuthorEntity } from '../entities/author.entity'

export class CreateAuthorDto {
  @IsNotEmpty()
  @MaxLength(50, { message: ErrorMessage.NAME_MAX_LENGTH })
  @Validate(Unique, [AuthorEntity])
  @ApiProperty({
    example: 'Author'
  })
  nickname: string
}
