import { ApiProperty } from '@nestjs/swagger'
import { IResponseSettingAction } from 'src/interfaces/interfaces/setting-action.interface'
import { PhotoResponseDto } from 'src/modules/assets/dtos/photo.response.dto'

export class SettingResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  type: string

  @ApiProperty()
  description: string

  @ApiProperty()
  url: string

  @ApiProperty()
  actions: IResponseSettingAction[]

  @ApiProperty()
  image?: PhotoResponseDto
}
