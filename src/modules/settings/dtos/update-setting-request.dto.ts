import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, ValidateIf } from 'class-validator'
import { ESettingTypes } from 'src/interfaces/enums/setting-type.enum'
import { ICreateSettingAction } from 'src/interfaces/interfaces/setting-action.interface'
import { AssetsEntity } from 'src/modules/assets/assets.entity'

export class UpdateSettingRequestDto {
  @ValidateIf((val) => val.type)
  @IsEnum(ESettingTypes)
  @ApiProperty({
    example: ESettingTypes.BANNER_CARD
  })
  type: ESettingTypes

  @ApiProperty({
    example: 'Image for SEO Homepage'
  })
  name: string

  @ApiProperty({
    example: 'Image best seller products'
  })
  description: string

  @ApiProperty({
    example: 'https://app-templates.vercel.app/template'
  })
  url: string

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
  actions: ICreateSettingAction[]

  @ApiProperty({
    example: 1
  })
  image?: AssetsEntity
}
