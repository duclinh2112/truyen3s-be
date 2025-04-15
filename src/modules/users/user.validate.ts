import { CommonException } from '@common/exceptions'
import { Injectable } from '@nestjs/common'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { CreateUserRequestDto } from './dtos'
import { UpdateUserIdRequestDto } from './dtos/update-user-id.request.dto'
import { UsersRepository } from './repositories/user.repository'
import { CreateUserFromProviderDto } from './dtos/create-user-from-provider.dto'

@Injectable()
export class UserValidate {
  constructor(private usersRepository: UsersRepository) {}

  public static validateUser(userDto: CreateUserRequestDto) {
    if (!userDto.phone && !userDto.email) {
      throw new CommonException(
        ErrorType.EMAIL_PHONE_NOT_EMPTY,
        ErrorMessage.EMAIL_PHONE_NOT_EMPTY
      )
    }
  }

  public static validateUserProvider(userDto: CreateUserFromProviderDto) {
    if (!userDto.email) {
      throw new CommonException(
        ErrorType.EMAIL_NOT_EMPTY,
        ErrorMessage.EMAIL_NOT_EMPTY
      )
    }

    if (!userDto.provider) {
      throw new CommonException(
        ErrorType.PROVIDER_NOT_EMPTY,
        ErrorMessage.PROVIDER_NOT_EMPTY
      )
    }

    if (!userDto.providerAccountId) {
      throw new CommonException(
        ErrorType.PROVIDER_ACCOUNT_ID_NOT_EMPTY,
        ErrorMessage.PROVIDER_ACCOUNT_ID_NOT_EMPTY
      )
    }
  }

  public async validateUnique(id: number, newUser: UpdateUserIdRequestDto) {
    const currentUser = await this.usersRepository.findOne(id)
    if (!currentUser) {
      throw new CommonException(
        ErrorType.USER_NOT_FOUND,
        ErrorMessage.USER_NOT_FOUND
      )
    }
    if (newUser.phone !== currentUser.phone) {
      const checkPhone = await this.usersRepository.count({
        where: { phone: newUser.phone }
      })
      if (checkPhone > 0) {
        throw new CommonException(
          ErrorType.PHONE_EXISTS,
          ErrorMessage.PHONE_EXISTS
        )
      }
    }
    if (newUser.email !== currentUser.email) {
      const checkEmail = await this.usersRepository.count({
        where: { email: newUser.email }
      })
      if (checkEmail > 0) {
        throw new CommonException(
          ErrorType.EMAIL_EXISTS,
          ErrorMessage.EMAIL_EXISTS
        )
      }
    }

    return currentUser
  }
}
