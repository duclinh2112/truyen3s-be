import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { CouponEntity } from './coupon.entity'
import { applyFilter } from '@common/functions'

const TABLE_NAME = 'coupons'
@EntityRepository(CouponEntity)
export class CouponRepository extends Repository<CouponEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: CouponEntity[], total: number]> {
    const { skip, perPage: take, filter } = pagination
    const query = this.createQueryBuilder(TABLE_NAME).skip(skip).take(take)
    applyFilter(query, filter, TABLE_NAME, ['code'])

    return query.getManyAndCount()
  }

  public getActive(code): Promise<CouponEntity> {
    const query = this.createQueryBuilder('coupons')
      .where('coupons.code = :code', { code })
      .andWhere('coupons.active = :active', { active: true })
      .andWhere('coupons.applicableDate <= :applicableDate', {
        applicableDate: new Date()
      })
      .andWhere('coupons.expirationDate > :expirationDate', {
        expirationDate: new Date()
      })
      .getOne()
    return query
  }
}
