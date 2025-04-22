import { EntityRepository, Repository } from 'typeorm'
import { ComicsEntity } from './entities/comic.entity'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { applySort, applyFilterComic } from '@common/functions'
import { UserEntity } from '../users/entities/user.entity'

const TABLE_NAME = 'comics'

@EntityRepository(ComicsEntity)
export class ComicRepository extends Repository<ComicsEntity> {
  public async getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: ComicsEntity[], total: number]> {
    const { skip, perPage: take, sort, filter } = pagination

    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.author`, 'author')
      .leftJoinAndSelect(`${TABLE_NAME}.category`, 'category')
      .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .leftJoinAndSelect(`${TABLE_NAME}.childCategories`, 'childCategories')
      .skip(skip)
      .take(take)

    applyFilterComic(query, filter, TABLE_NAME)
    applySort(query, sort, TABLE_NAME)
    // applyRange(query, range, TABLE_NAME)

    return query.getManyAndCount()
  }

  public async getAndCountByIds(
    ids: string[],
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: ComicsEntity[], total: number]> {
    const { skip, perPage: take, sort, filter } = pagination

    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.author`, 'author')
      .leftJoinAndSelect(`${TABLE_NAME}.category`, 'category')
      .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .leftJoinAndSelect(`${TABLE_NAME}.childCategories`, 'childCategories')
      .where(`${TABLE_NAME}.id IN(:...ids)`, { ids })
      .skip(skip)
      .take(take)

    applyFilterComic(query, filter, TABLE_NAME)
    applySort(query, sort, TABLE_NAME)
    // applyRange(query, range, TABLE_NAME)

    return query.getManyAndCount()
  }

  public getById(id: number): Promise<ComicsEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.author`, 'author')
      .leftJoinAndSelect(`${TABLE_NAME}.category`, 'category')
      .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .leftJoinAndSelect(`${TABLE_NAME}.childCategories`, 'childCategories')
      .where(`${TABLE_NAME}.id = :id`, { id })

    return query.getOne()
  }

  public getBySlug(slug: string): Promise<ComicsEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.author`, 'author')
      .leftJoinAndSelect(`${TABLE_NAME}.category`, 'category')
      .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .leftJoinAndSelect(`${TABLE_NAME}.childCategories`, 'childCategories')
      .where(`${TABLE_NAME}.slug = :slug`, { slug })
      .orWhere(`${TABLE_NAME}.id = :id`, { id: slug })

    return query.getOne()
  }

  public async getComicsByAuthor(
    pagination: PaginationRequest<QueryRequest>,
    user: UserEntity
  ): Promise<[entity: ComicsEntity[], total: number]> {
    const { skip, perPage: take, sort, filter } = pagination

    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.author`, 'author')
      .leftJoinAndSelect('author.authorProfile', 'author')
      .leftJoinAndSelect(`${TABLE_NAME}.category`, 'category')
      .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .leftJoinAndSelect(`${TABLE_NAME}.childCategories`, 'childCategories')
      .where(`author.id = :id`, { id: user.id })
      .skip(skip)
      .take(take)

    applyFilterComic(query, filter, TABLE_NAME)
    applySort(query, sort, TABLE_NAME)
    // applyRange(query, range, TABLE_NAME)

    return query.getManyAndCount()
  }
}
