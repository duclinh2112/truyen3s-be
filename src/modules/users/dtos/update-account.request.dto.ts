import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsOptional,
  Matches,
  MaxLength,
  Validate,
  ValidateIf
} from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { Unique } from 'typeorm'
import { UserEntity } from '../entities/user.entity'

export class UpdateAccountRequestDto {
  @ApiProperty({
    example: 1
  })
  avatar: number

  @IsOptional()
  @MaxLength(100, { message: ErrorMessage.fullName_MAX_LENGTH })
  @ApiProperty({
    example: 'Nguyen Van A'
  })
  fullName: string

  @IsOptional()
  @Validate(Unique, [UserEntity])
  @Matches(regex.phoneRegex, { message: ErrorMessage.PHONE_REGEX })
  @ApiProperty({
    example: '0346718111'
  })
  phone: string

  @IsOptional()
  @IsDateString(undefined, { message: ErrorMessage.BIRTHDAY_STRING })
  @ApiProperty({
    example: new Date()
  })
  birthday: Date

  @IsOptional()
  @ApiProperty({
    example: 'Đà Nẵng'
  })
  city: string

  @IsOptional()
  @ApiProperty({
    example: 'Hải Châu'
  })
  district: string

  @IsOptional()
  @ApiProperty({
    example: 'Liên Chiểu'
  })
  wards: string

  @IsOptional()
  @ApiProperty({
    example: '71 Nguy'
  })
  address: string
}
