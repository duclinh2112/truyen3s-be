import { TokenService } from '@auth'
import { PaginationResponseDto } from '@common/dtos'
import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { Injectable } from '@nestjs/common'
import { TimeoutError } from 'rxjs'
import { HashHelper, Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { ERoles } from 'src/interfaces/enums/roles.enum'
import { JwtPayload } from '../auth/dtos'
import { MailService } from '../mail/mail.service'
import { RolesRepository } from '../roles/role.repository'
import { UserResponseDto } from './dtos'
import { CreateUserRequestDto } from './dtos/create-user-request.dto'
import { UpdateUserIdRequestDto } from './dtos/update-user-id.request.dto'
import { UpdateUserRequestDto } from './dtos/update-user.request.dto'
import { UserEntity } from './entities/user.entity'
import { UsersRepository } from './repositories/user.repository'
import { UserMapper } from './user.mapper'
import { UserValidate } from './user.validate'
import { AssetsRepository } from '../assets/assets.repository'

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UsersRepository,
    private rolesRepository: RolesRepository,
    private assetsRepository: AssetsRepository,
    private mailService: MailService,
    private tokenService: TokenService,
    private userValidate: UserValidate
  ) {}

  public async listUser(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<UserEntity>> {
    try {
      const [list, count] = await this.usersRepository.getUsersAndCount(
        pagination
      )
      return Pagination.of<UserEntity>(pagination, count, list)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  /**
   * Create new user
   * @param userDto {CreateUserRequestDto}
   * @returns {Promise<UserResponseDto>}
   */
  public async createUser(
    userDto: CreateUserRequestDto
  ): Promise<UserResponseDto> {
    UserValidate.validateUser(userDto)
    const UserRole = await this.rolesRepository.findOne({ name: ERoles.USER })
    if (UserRole) {
      try {
        let userEntity = UserMapper.toCreateEntity(userDto, [UserRole.id])
        userEntity.password = await HashHelper.encrypt(userEntity.password)
        userEntity = await this.usersRepository.save(userEntity)
        const payload: JwtPayload = {
          id: userEntity.id,
          email: userEntity.email
        }
        const token = this.tokenService.generateVerifyToken(payload)

        this.mailService.sendMailConfirmation(userEntity, token.verifyToken)
        return UserMapper.toDto(userEntity)
      } catch (error) {
        if (error instanceof TimeoutError) {
          throw new CommonException(
            ErrorType.REQUEST_TIMEOUT,
            ErrorMessage.REQUEST_TIMEOUT
          )
        } else {
          throw new CommonException(
            ErrorType.INTERNAL_SERVER,
            ErrorMessage.INTERNAL_SERVER
          )
        }
      }
    } else {
      throw new CommonException(
        ErrorType.ROLE_DOES_NOT_EXISTS,
        ErrorMessage.ROLE_DOES_NOT_EXISTS
      )
    }
  }

  public getUsers(user: UserEntity): Promise<UserResponseDto> {
    try {
      return UserMapper.toDto(user)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async getUserById(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findUserById(id)
    if (!user) {
      throw new CommonException(
        ErrorType.USER_NOT_FOUND,
        ErrorMessage.USER_NOT_FOUND
      )
    }
    const photo = await this.assetsRepository.findOne(user.photoId)
    return UserMapper.toDto(user, photo)
  }

  public async updateUser(
    currentUser: UserEntity,
    newUser: UpdateUserRequestDto
  ): Promise<UserResponseDto> {
    try {
      currentUser = UserMapper.toUpdateEntity(currentUser, newUser)
      if (currentUser.password) {
        currentUser.password = await HashHelper.encrypt(newUser.password)
      }
      await this.usersRepository.save(currentUser)
      const userResponse = await this.usersRepository.findOne({
        id: currentUser.id
      })
      return UserMapper.toDto(userResponse)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async updateUserById(
    id: number,
    newUser: UpdateUserIdRequestDto
  ): Promise<UserResponseDto> {
    let currentUser = await this.userValidate.validateUnique(id, newUser)
    try {
      currentUser = UserMapper.toUpdateEntityById(currentUser, newUser)
      if (currentUser.password) {
        currentUser.password = await HashHelper.encrypt(newUser.password)
      }
      await this.usersRepository.save(currentUser)
      const userResponse = await this.usersRepository.findOne({
        id: currentUser.id
      })
      return UserMapper.toDto(userResponse)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
}
