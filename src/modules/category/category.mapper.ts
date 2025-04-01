import { toSlug } from '@common/functions'
import { CategoryEntity } from './category.entity'
import { CategoryResponseDto } from './dtos/response-category.dto'
import { CreateCategoryRequestDto } from './dtos/create-category-request.dto'
import { ConfigService } from '@nestjs/config'

export class CategoryMapper {
  public static toDto(entity: CategoryEntity, configService: ConfigService) {
    const { id, name, slug, description } = entity || {}
    const dto = new CategoryResponseDto()
    dto.id = id
    dto.name = name
    dto.slug = slug
    dto.description = description
    // if (image) dto.image = AssetsMapper.toDto(image, configService)
    return dto
  }

  public static async toCreate(
    dto: CreateCategoryRequestDto
  ): Promise<CategoryEntity> {
    const { name, description } = dto
    const entity = new CategoryEntity()
    entity.name = name
    entity.slug = toSlug(`${name}-${Math.floor(1000 + Math.random() * 9000)}`)
    entity.description = description
    // entity.image = new AssetsEntity({ id: image })
    return entity
  }
}
