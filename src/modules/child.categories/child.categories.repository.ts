import { EntityRepository, Repository } from 'typeorm'
import { ChildCategoryEntity } from './entities/child.category.entity'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { applyFilter, applySort } from '@common/functions'

const TABLE_NAME = 'child_categories'
@EntityRepository(ChildCategoryEntity)
export class ChildCategoryRepository extends Repository<ChildCategoryEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: ChildCategoryEntity[], total: number]> {
    const { skip, perPage: take, sort, filter } = pagination

    const query = this.createQueryBuilder(TABLE_NAME).leftJoinAndSelect(
      `${TABLE_NAME}.category`,
      'category'
    )

    if (skip !== undefined && take !== undefined) {
      query.skip(skip).take(take)
    }

    applyFilter(query, filter, TABLE_NAME)
    applySort(query, sort, TABLE_NAME)

    return query.getManyAndCount()
  }

  public getById(id: number): Promise<ChildCategoryEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.category`, 'category')
      .where(`${TABLE_NAME}.id = :id`, { id })
      .where(`${TABLE_NAME}.slug = :id`, { id })

    return query.getOne()
  }
}
