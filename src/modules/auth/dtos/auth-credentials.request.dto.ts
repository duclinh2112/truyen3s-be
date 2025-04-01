import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class AuthCredentialsRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin@gmail.com'
  })
  readonly email: string

  @IsNotEmpty()
  @ApiProperty({
    example: '12345678'
  })
  readonly password: string
}
