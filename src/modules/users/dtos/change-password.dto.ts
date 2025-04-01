import { ApiProperty } from '@nestjs/swagger'

export class ChangePasswordDto {
  @ApiProperty({
    example: '12345678@Tc'
  })
  oldPassword: string

  @ApiProperty({
    example: '987654321@Ab'
  })
  newPassword: string
}
