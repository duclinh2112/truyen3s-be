import { ChildCategoryEntity } from './entities/child.category.entity'
import { ChildCategoryResponseDto } from './dto/response-child-category.dto'
import { CreateChildCategoryDto } from './dto/create-child-category.dto'
import { toSlug } from '@common/functions'
import { CategoryMapper } from '../category/category.mapper'
import { CategoryEntity } from '../category/category.entity'
import { ConfigService } from '@nestjs/config'

export class ChildCategoryMapper {
  public static toDto(
    entity: ChildCategoryEntity,
    configService: ConfigService
  ) {
    const { id, name, slug, description, category } = entity || {}
    const dto = new ChildCategoryResponseDto()
    dto.id = id
    dto.name = name
    dto.slug = slug
    dto.description = description
    dto.category = CategoryMapper.toDto(category, configService)
    return dto
  }

  public static async toCreate(
    dto: CreateChildCategoryDto
  ): Promise<ChildCategoryEntity> {
    const { name, description, category } = dto
    const entity = new ChildCategoryEntity()
    entity.name = name
    entity.slug = toSlug(`${name}-${Math.floor(1000 + Math.random() * 9000)}`)
    entity.description = description
    entity.category = new CategoryEntity({ id: category })
    return entity
  }
}
