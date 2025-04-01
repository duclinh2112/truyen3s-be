import { ConfigService } from '@nestjs/config'
import { ChapterEntity } from './entities/chapter.entity'
import { ResponseChapterDto } from './dto/response-chapter.dto'
import { ComicMapper } from '../comics/comic.mapper'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { toSlug } from '@common/functions'
import { ComicsEntity } from '../comics/entities/comic.entity'

export class ChapterMapper {
  public static async toDto(
    entity: ChapterEntity,
    configService: ConfigService
  ) {
    const { id, stt, name, slug, content, comic } = entity
    const dto = new ResponseChapterDto()
    dto.id = id
    dto.stt = stt
    dto.name = name
    dto.slug = slug
    dto.content = content
    dto.comic = await ComicMapper.toDto(comic, configService)
    return dto
  }

  public static async toCreate(dto: CreateChapterDto): Promise<ChapterEntity> {
    const { stt, name, content, comic } = dto
    const entity = new ChapterEntity()
    entity.stt = stt
    entity.name = name
    entity.slug = toSlug(
      `${dto.name}-${Math.floor(1000 + Math.random() * 9000)}`
    )
    entity.content = content
    if (comic) {
      entity.comic = new ComicsEntity({ id: comic })
    }

    return entity
  }
}
