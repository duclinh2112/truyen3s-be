import { ConfigService } from '@nestjs/config'
import { AssetsEntity } from '../assets/assets.entity'
import { AssetsMapper } from '../assets/assets.mapper'
import { CreateSettingRequestDto } from './dtos/create-setting-request.dto'
import { SettingResponseDto } from './dtos/setting-response.dto'
import { SettingEntity } from './setting.entity'
import { IResponseSettingAction } from 'src/interfaces/interfaces/setting-action.interface'

export class SettingMapper {
  public static toDto(
    entity: SettingEntity,
    actions: IResponseSettingAction[],
    configService: ConfigService
  ) {
    const { id, name, type, description, url, image } = entity
    const dto = new SettingResponseDto()
    if (image) dto.image = AssetsMapper.toDto(entity.image, configService)
    dto.id = id
    dto.type = type
    dto.name = name
    dto.description = description
    dto.url = url
    dto.actions = actions
    return dto
  }

  public static async toCreate(
    dto: CreateSettingRequestDto
  ): Promise<SettingEntity> {
    const { type, name, description, url, image, actions } = dto
    const entity = new SettingEntity()
    entity.type = type
    entity.name = name
    entity.description = description
    entity.url = url
    entity.actions = actions
    entity.image = new AssetsEntity({ id: image })
    return entity
  }
}
