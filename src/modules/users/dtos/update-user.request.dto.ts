import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsOptional,
  Length,
  Matches,
  MaxLength
} from 'class-validator'
import { regex } from 'src/helpers/regex.helper'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'

export class UpdateUserRequestDto {
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

  @ApiProperty({
    example: 'Da Nang'
  })
  city: string

  @ApiProperty({
    example: 'Hai Chai'
  })
  district: string

  @ApiProperty({
    example: 'Thanh Khe'
  })
  wards: string

  @ApiProperty({
    example: '71 Da Na Sa'
  })
  address: string

  @IsOptional()
  @Matches(regex.passwordRegex, { message: ErrorMessage.PASSWORD_REGEX })
  @Length(6, 20, { message: ErrorMessage.PASSWORD_LENGTH })
  @ApiProperty({
    example: 'Khoqua227'
  })
  password: string
}
