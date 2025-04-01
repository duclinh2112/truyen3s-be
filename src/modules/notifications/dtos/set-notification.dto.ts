import { IsNotEmpty } from 'class-validator'
import { UserEntity } from 'src/modules/users/entities/user.entity'

export class SetNotificationDto {
  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  isRead: boolean

  @IsNotEmpty()
  value: string

  @IsNotEmpty()
  user: UserEntity
}
