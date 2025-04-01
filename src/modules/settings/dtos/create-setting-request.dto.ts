import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { ESettingTypes } from 'src/interfaces/enums/setting-type.enum'
import { ICreateSettingAction } from 'src/interfaces/interfaces/setting-action.interface'

export class CreateSettingRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: ESettingTypes.BANNER_HOME
  })
  @IsEnum(ESettingTypes, { message: ErrorMessage.SETTING_TYPE_ENUM })
  type: ESettingTypes

  @ApiProperty({
    example: 'Home Banner'
  })
  name: string

  @ApiProperty({
    example: 'Home banner product'
  })
  description: string

  @ApiProperty({
    example: 'https://tibe.vn/cards/'
  })
  url: string

  @IsOptional()
  @ApiProperty({
    example: [
      {
        name: 'Home Banner',
        description: 'Wonderful home banner',
        url: 'https://tibe.vn/gifts/',
        image: 1
      }
    ]
  })
  actions?: ICreateSettingAction[]

  @ApiProperty({
    example: 1
  })
  image?: number
}
