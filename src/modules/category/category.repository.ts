import { applyFilter, applySort } from '@common/functions'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { CategoryEntity } from './category.entity'

const TABLE_NAME = 'categories'
@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: CategoryEntity[], total: number]> {
    const { skip, perPage: take, sort, filter } = pagination
    const query = this.createQueryBuilder(TABLE_NAME)
      // .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .leftJoinAndSelect(`${TABLE_NAME}.childCategories`, 'childCategories')

    if (skip !== undefined && take !== undefined) {
      query.skip(skip).take(take)
    }

    applyFilter(query, filter, TABLE_NAME)
    applySort(query, sort, TABLE_NAME)

    return query.getManyAndCount()
  }

  public getById(id: number): Promise<CategoryEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      // .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .where(`${TABLE_NAME}.id = :id`, { id })
      .where(`${TABLE_NAME}.slug = :id`, { id })

    return query.getOne()
  }
}
