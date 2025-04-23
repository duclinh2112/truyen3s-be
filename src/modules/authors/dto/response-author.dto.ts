import { ApiProperty } from '@nestjs/swagger'
import { UserResponseDto } from 'src/modules/users/dtos'

export class ResponseAuthorDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  nickname: string

  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto
}
