import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MaxLength } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class UpdateAuthorDto {
  @IsOptional()
  @MaxLength(50, { message: ErrorMessage.NAME_MAX_LENGTH })
  @ApiProperty({
    example: 'Author'
  })
  nickname: string
}
