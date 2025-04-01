import { PhotoResponseDto } from 'src/modules/assets/dtos/photo.response.dto'

export interface ICreateSettingAction {
  name: string
  description: string
  url: string
  image: number
}

export interface IResponseSettingAction {
  name: string
  description: string
  url: string
  image?: PhotoResponseDto
}
