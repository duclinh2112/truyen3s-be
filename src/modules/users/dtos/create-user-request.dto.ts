import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  Validate
} from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { Unique } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { regex } from 'src/helpers/regex.helper'

export class CreateUserRequestDto {
  @IsNotEmpty({ message: ErrorMessage.FULL_NOT_EMPTY })
  @MaxLength(100, { message: ErrorMessage.fullName_MAX_LENGTH })
  @ApiProperty({
    example: 'Nguyen Van A'
  })
  fullName: string

  @IsNotEmpty({ message: ErrorMessage.EMAIL_NOT_EMPTY })
  @IsEmail(undefined, { message: ErrorMessage.EMAIL_VALID })
  @Validate(Unique, [UserEntity])
  @ApiProperty({
    example: 'nguyenvana@mailinator.com'
  })
  email: string

  @IsOptional()
  @ApiProperty({
    example: 'User'
  })
  role: string

  @IsOptional()
  @Matches(regex.statusRegex, { message: ErrorMessage.STATUS_REGEX })
  @ApiProperty({
    example: 'active'
  })
  status: string

  @ApiProperty({
    example: 1
  })
  photoId: number
}
