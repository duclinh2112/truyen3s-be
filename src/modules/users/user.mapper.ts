import { RoleMapper } from 'src/modules/roles/role.mapper'
import { UserStatus } from '../../interfaces/enums/user-status.enum'
import { PermissionMapper } from '../permissions/permission.mapper'
import { RoleEntity } from '../roles/role.entity'
import { CreateUserRequestDto, UserResponseDto } from './dtos'
import { UpdateUserIdRequestDto } from './dtos/update-user-id.request.dto'
import { UpdateUserRequestDto } from './dtos/update-user.request.dto'
import { UserEntity } from './entities/user.entity'
import { AssetsEntity } from '../assets/assets.entity'
import { CreateUserFromProviderDto } from './dtos/create-user-from-provider.dto'
import { AuthorMapper } from '../authors/author.mapper'

export class UserMapper {
  public static async toDto(
    entity: UserEntity,
    image?: AssetsEntity
  ): Promise<UserResponseDto> {
    const dto = new UserResponseDto()

    dto.id = entity.id
    dto.photoId = entity.photoId
    dto.fullName = entity.fullName
    dto.birthday = entity.birthday
    dto.image = image
    dto.city = entity.city
    dto.district = entity.district
    dto.wards = entity.wards
    dto.address = entity.address
    dto.phone = entity.phone
    dto.email = entity.email
    dto.roles = await Promise.all((await entity.roles).map(RoleMapper.toDto))
    dto.status = entity.status
    dto.isSuperUser = entity.isSuperUser

    if (entity.authorProfile) {
      dto.authorProfile = await AuthorMapper.toDto(entity.authorProfile)
    }

    return dto
  }

  public static async toDtoWithRelations(
    entity: UserEntity
  ): Promise<UserResponseDto> {
    const dto = new UserResponseDto()

    dto.id = entity.id
    dto.fullName = entity.fullName
    dto.birthday = entity.birthday
    dto.city = entity.city
    dto.district = entity.district
    dto.wards = entity.wards
    dto.address = entity.address
    dto.phone = entity.phone
    dto.email = entity.email
    dto.permissions = await Promise.all(
      (await entity.permissions).map(PermissionMapper.toDto)
    )
    dto.roles = await Promise.all(
      (await entity.roles).map(RoleMapper.toDtoWithRelations)
    )
    dto.isSuperUser = entity.isSuperUser
    dto.status = entity.status
    return dto
  }

  public static toCreateEntity(
    dto: CreateUserRequestDto,
    UserRoleId: [number]
  ): UserEntity {
    const entity = new UserEntity()
    entity.photoId = dto.photoId
    entity.fullName = dto.fullName
    entity.birthday = dto.birthday
    entity.phone = dto.phone || null
    entity.email = dto.email || null
    entity.password = dto.password

    entity.roles = Promise.resolve(
      UserRoleId.map((id) => new RoleEntity({ id: id }))
    )
    entity.status = UserStatus.Inactive
    entity.isSuperUser = false
    return entity
  }

  public static toUpdateEntity(
    entity: UserEntity,
    dto: UpdateUserRequestDto
  ): UserEntity {
    entity.fullName = dto.fullName
    entity.photoId = dto.photoId
    entity.city = dto.city
    entity.district = dto.district
    entity.wards = dto.wards
    entity.address = dto.address
    entity.birthday = dto.birthday
    entity.password = dto.password
    return entity
  }

  public static toUpdateEntityById(
    entity: UserEntity,
    dto: UpdateUserIdRequestDto
  ): UserEntity {
    entity.fullName = dto.fullName
    entity.photoId = dto.photoId
    entity.email = dto.email
    entity.phone = dto.phone
    entity.birthday = dto.birthday
    entity.password = dto.password
    entity.status = dto.status
    return entity
  }

  public static toCreateProviderEntity(
    dto: CreateUserFromProviderDto,
    UserRoleId: [number]
  ): UserEntity {
    const entity = new UserEntity()
    entity.fullName = dto.fullName
    entity.email = dto.email
    entity.provider = dto.provider
    entity.providerAccountId = dto.providerAccountId

    entity.roles = Promise.resolve(
      UserRoleId.map((id) => new RoleEntity({ id: id }))
    )
    entity.status = UserStatus.Active
    entity.isSuperUser = false

    return entity
  }
}
