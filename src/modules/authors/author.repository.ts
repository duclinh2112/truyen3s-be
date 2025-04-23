import { EntityRepository, Repository } from 'typeorm'
import { AuthorEntity } from './entities/author.entity'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { applyFilter, applySort } from '@common/functions'

const TABLE_NAME = 'authors'

@EntityRepository(AuthorEntity)
export class AuthorRepository extends Repository<AuthorEntity> {
  public async getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: AuthorEntity[], total: number]> {
    const { skip, perPage: take, filter, sort } = pagination

    const query = this.createQueryBuilder(TABLE_NAME).leftJoinAndSelect(
      `${TABLE_NAME}.user`,
      'user'
    )

    if (skip !== undefined && take !== undefined) {
      query.skip(skip).take(take)
    }

    applyFilter(query, filter, TABLE_NAME)
    applySort(query, sort, TABLE_NAME)

    return query.getManyAndCount()
  }

  public getById(id: number): Promise<AuthorEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.user`, 'user')
      .where(`${TABLE_NAME}.id = :id`, { id })

    return query.getOne()
  }
}
