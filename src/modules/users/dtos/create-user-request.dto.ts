import { Unique } from '@common/validations/unique/unique'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
  Validate,
  ValidateIf
} from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { UserEntity } from '../entities/user.entity'

export class CreateUserRequestDto {
  @IsNotEmpty({ message: ErrorMessage.FULL_NOT_EMPTY })
  @MaxLength(100, { message: ErrorMessage.fullName_MAX_LENGTH })
  @ApiProperty({
    example: 'Nguyen Van A'
  })
  fullName: string

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
  @Validate(Unique, [UserEntity])
  @Matches(regex.phoneRegex, { message: ErrorMessage.PHONE_REGEX })
  @ApiProperty({
    example: '0346718111'
  })
  phone: string

  @IsNotEmpty({ message: ErrorMessage.EMAIL_NOT_EMPTY })
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @Validate(Unique, [UserEntity])
  @ApiProperty({
    example: 'nguyenvana@mailinator.com'
  })
  email: string

  @Matches(regex.passwordRegex, { message: ErrorMessage.PASSWORD_REGEX })
  @Length(6, 20, { message: ErrorMessage.PASSWORD_LENGTH })
  @IsNotEmpty({ message: ErrorMessage.PASSWORD_NOT_EMPTY })
  @ApiProperty({
    example: 'Khoqua226'
  })
  password: string
}
