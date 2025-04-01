import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { ChapterEntity } from './entities/chapter.entity'
import { applyFilter, applySort } from '@common/functions'

const TABLE_NAME = 'chapters'
@EntityRepository(ChapterEntity)
export class ChapterRepository extends Repository<ChapterEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: ChapterEntity[], total: number]> {
    const { skip, perPage: take, filter, sort } = pagination
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.comic`, 'comic')
      .orderBy(`${TABLE_NAME}.stt`, 'ASC')

    if (skip !== undefined && take !== undefined) {
      query.skip(skip).take(take)
    }

    applyFilter(query, filter, TABLE_NAME)
    applySort(query, sort, TABLE_NAME)

    return query.getManyAndCount()
  }

  public getById(id: number): Promise<ChapterEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.comic`, 'comic')
      .where(`${TABLE_NAME}.id = :id`, { id })

    return query.getOne()
  }

  public read(slugComic: string, id: number): Promise<ChapterEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.comic`, 'comic')
      .leftJoinAndSelect('comic.image', 'image')
      .where(`comic.slug = :slugComic`, { slugComic })
      .orWhere(`${TABLE_NAME}.comic_id = :comicId`, { comicId: slugComic })
      .where(`${TABLE_NAME}.id = :id`, { id })

    return query.getOne()
  }

  public async getSttChapter(idComic: number): Promise<number> {
    const query = await this.createQueryBuilder(TABLE_NAME)
      .select(`MAX(${TABLE_NAME}.stt)`, 'maxStt')
      .where(`${TABLE_NAME}.comic_id = :comic`, { comic: idComic })
      .getRawOne()

    return (query.maxStt || 0) + 1
  }

  public async getAdjacentChapter(
    slugComic: string,
    id: number,
    direction: 'next' | 'prev'
  ): Promise<ChapterEntity | null> {
    const isNext = direction === 'next'

    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.comic`, 'comic')
      .leftJoinAndSelect('comic.image', 'image')
      .where(`comic.slug = :slugComic`, { slugComic })
      .andWhere(`${TABLE_NAME}.id ${isNext ? '>' : '<'} :id`, { id })
      .orderBy(`${TABLE_NAME}.stt`, isNext ? 'ASC' : 'DESC')
      .select(`${TABLE_NAME}.id`)
      .limit(1)

    return query.getOne()
  }

  public async getNextChapter(
    slugComic: string,
    id: number
  ): Promise<ChapterEntity | null> {
    return this.getAdjacentChapter(slugComic, id, 'next')
  }

  public async getPrevChapter(
    slugComic: string,
    id: number
  ): Promise<ChapterEntity | null> {
    return this.getAdjacentChapter(slugComic, id, 'prev')
  }

  public async getFirstChapter(slugComic: string): Promise<ChapterEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.comic`, 'comic')
      .where('comic.slug = :slugComic', { slugComic })
      .orderBy(`${TABLE_NAME}.id`, 'ASC')
      .limit(1)

    return query.getOne()
  }
}
