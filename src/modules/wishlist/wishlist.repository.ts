import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'

import { applyFilter } from '@common/functions'
import { WishlistEntity } from './wishlist.entity'

const TABLE_NAME = 'wishlist'

@EntityRepository(WishlistEntity)
export class WishlistRepository extends Repository<WishlistEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: WishlistEntity[], total: number]> {
    const { skip, perPage: take, filter } = pagination
    const query = this.createQueryBuilder(TABLE_NAME).skip(skip).take(take)

    applyFilter(query, filter, TABLE_NAME, ['name'])
    return query.getManyAndCount()
  }

  public getById(id: number): Promise<WishlistEntity> {
    const query = this.createQueryBuilder(TABLE_NAME).where(
      `${TABLE_NAME}.id = :id`,
      { id }
    )

    return query.getOne()
  }

  public getByUserId(id: number): Promise<WishlistEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoin(`${TABLE_NAME}.user`, 'user')
      .where(`user.id = :id`, { id })

    return query.getOne()
  }
}
