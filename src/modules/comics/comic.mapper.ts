import { toSlug } from '@common/functions'
import { CreateComicDto } from './dto/create-comic.dto'
import { ComicsEntity } from './entities/comic.entity'
import { UserEntity } from '../users/entities/user.entity'
import { CategoryEntity } from '../category/category.entity'
import { AssetsEntity } from '../assets/assets.entity'
import { ChildCategoryEntity } from '../child.categories/entities/child.category.entity'
import { ConfigService } from '@nestjs/config'
import { ResponseComicDto } from './dto/response-comic.dto'
import { UserMapper } from '../users/user.mapper'
import { CategoryMapper } from '../category/category.mapper'
import { AssetsMapper } from '../assets/assets.mapper'

export class ComicMapper {
  public static async toDto(
    entity: ComicsEntity,
    configService: ConfigService
  ) {
    const {
      id,
      name,
      slug,
      description,
      price,
      isHot,
      isRecommend,
      isFull,
      author,
      category,
      image,
      childCategories,
      view
    } = entity
    const dto = new ResponseComicDto()
    dto.id = id
    dto.name = name
    dto.slug = slug
    dto.description = description
    dto.price = price
    dto.isHot = isHot
    dto.isRecommend = isRecommend
    dto.isFull = isFull
    dto.view = view

    if (author) dto.author = await UserMapper.toDto(author)
    if (category) dto.category = CategoryMapper.toDto(category, configService)
    if (image) dto.image = AssetsMapper.toDto(image, configService)
    if (childCategories?.length)
      dto.childCategories = childCategories.map(
        (item) => new ChildCategoryEntity(item)
      )

    return dto
  }

  public static async toCreate(
    dto: CreateComicDto,
    user: UserEntity
  ): Promise<ComicsEntity> {
    const entity = new ComicsEntity()
    entity.name = dto.name
    entity.slug = toSlug(
      `${dto.name}-${Math.floor(1000 + Math.random() * 9000)}`
    )
    entity.description = dto.description
    entity.price = dto.price
    entity.isHot = dto.isHot
    entity.isRecommend = dto.isRecommend
    entity.isFull = dto.isFull
    entity.author = new UserEntity({ id: user.id })
    entity.category = new CategoryEntity({ id: dto.category })
    entity.image = new AssetsEntity({ id: dto.image })
    entity.childCategories = dto.childCategoryIds.map(
      (id) => new ChildCategoryEntity({ id })
    )
    return entity
  }
}
