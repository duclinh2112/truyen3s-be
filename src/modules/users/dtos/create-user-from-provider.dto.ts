import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class CreateUserFromProviderDto {
  @IsNotEmpty({ message: ErrorMessage.FULL_NOT_EMPTY })
  @MaxLength(100, { message: ErrorMessage.fullName_MAX_LENGTH })
  @ApiProperty({
    example: 'Nguyen Van A'
  })
  fullName: string

  @IsNotEmpty({ message: ErrorMessage.EMAIL_NOT_EMPTY })
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @ApiProperty({
    example: 'nguyenvana@mailinator.com'
  })
  email: string

  @ApiProperty({
    example: ''
  })
  providerAccountId: string

  @ApiProperty({
    example: 'google'
  })
  provider: string
}
