import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { ReviewEntity } from './review.entity'
import { applyFilter } from '@common/functions'

@EntityRepository(ReviewEntity)
export class ReviewRepository extends Repository<ReviewEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: ReviewEntity[], total: number]> {
    const { skip, perPage: take, filter } = pagination
    const query = this.createQueryBuilder('reviews')
      .leftJoinAndSelect('reviews.user', 'user')
      .leftJoinAndSelect('reviews.product', 'product')
      .skip(skip)
      .take(take)

    applyFilter(query, filter, 'reviews')

    return query.getManyAndCount()
  }
}
