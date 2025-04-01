import { ApiProperty } from '@nestjs/swagger'

export enum EAssetType {
  IMAGE = 'IMAGE',
  ICON = 'ICON',
  PATTERN = 'PATTERN',
  VIDEO = 'VIDEO'
}

export class UploadPhotoResponseDto {
  @ApiProperty()
  fileName: string

  @ApiProperty()
  link: string

  @ApiProperty()
  fileType: string
}
