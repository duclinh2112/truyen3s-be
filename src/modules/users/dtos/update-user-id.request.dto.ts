import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength
} from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class UpdateUserIdRequestDto {
  @IsOptional()
  @MaxLength(100, { message: ErrorMessage.fullName_MAX_LENGTH })
  @ApiProperty({
    example: 'Nguyen Van B'
  })
  fullName: string

  @IsOptional()
  @ApiProperty({
    example: 1
  })
  photoId: number

  @IsOptional()
  @IsDateString(undefined, { message: ErrorMessage.BIRTHDAY_STRING })
  @ApiProperty({
    example: new Date()
  })
  birthday: Date

  @IsOptional()
  @Matches(regex.phoneRegex, { message: ErrorMessage.PHONE_REGEX })
  @IsNotEmpty({ message: ErrorMessage.EMAIL_PHONE_NOT_EMPTY })
  @ApiProperty({
    example: '0346718110'
  })
  phone: string

  @IsOptional()
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @IsNotEmpty({ message: ErrorMessage.EMAIL_PHONE_NOT_EMPTY })
  @ApiProperty({
    example: 'abc@gmail.com'
  })
  email: string

  @IsOptional()
  @Matches(regex.passwordRegex, { message: ErrorMessage.PASSWORD_REGEX })
  @Length(6, 20, { message: ErrorMessage.PASSWORD_LENGTH })
  @ApiProperty({
    example: 'Khoqua227'
  })
  password: string

  @IsOptional()
  @Matches(regex.statusRegex, { message: ErrorMessage.STATUS_REGEX })
  @ApiProperty({
    example: 'block'
  })
  status: string
}
