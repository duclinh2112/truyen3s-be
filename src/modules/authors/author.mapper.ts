import { UserEntity } from '../users/entities/user.entity'
import { UserMapper } from '../users/user.mapper'
import { CreateAuthorDto } from './dto/create-author.dto'
import { ResponseAuthorDto } from './dto/response-author.dto'
import { AuthorEntity } from './entities/author.entity'

export class AuthorMapper {
  public static async toDto(entity: AuthorEntity) {
    const { id, nickname, user } = entity
    const dto = new ResponseAuthorDto()
    dto.id = id
    dto.nickname = nickname
    if (user) {
      dto.user = await UserMapper.toDto(user)
    }
    return dto
  }

  public static async toCreate(
    dto: CreateAuthorDto,
    user: UserEntity
  ): Promise<AuthorEntity> {
    const entity = new AuthorEntity()
    entity.nickname = dto.nickname
    entity.user = new UserEntity({ id: user.id })

    return entity
  }
}
