import { ApiProperty } from '@nestjs/swagger'
import { PermissionResponseDto } from '../../permissions/dtos'
import { RoleResponseDto } from '../../roles/dtos'
import { AssetsEntity } from 'src/modules/assets/assets.entity'
import { ResponseAuthorDto } from 'src/modules/authors/dto/response-author.dto'

export class UserResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  fullName: string

  @ApiProperty()
  photoId: number

  @ApiProperty()
  birthday: Date

  @ApiProperty()
  image: AssetsEntity

  @ApiProperty()
  city: string

  @ApiProperty()
  district: string

  @ApiProperty()
  wards: string

  @ApiProperty()
  address: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  email: string

  @ApiProperty({ type: [RoleResponseDto] })
  roles?: RoleResponseDto[]

  @ApiProperty({ type: [PermissionResponseDto] })
  permissions?: PermissionResponseDto[]

  @ApiProperty()
  isSuperUser: boolean

  @ApiProperty()
  status: string

  @ApiProperty({ type: () => ResponseAuthorDto, required: false })
  authorProfile?: ResponseAuthorDto
}
