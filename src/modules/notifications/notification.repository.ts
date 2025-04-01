import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'

import { applyFilter } from '@common/functions'
import { NotificationEntity } from './notification.entity'

const TABLE_NAME = 'notifications'

@EntityRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>,
    userId: number
  ): Promise<[entity: NotificationEntity[], total: number]> {
    const { skip, perPage: take, filter } = pagination
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoin('notifications.user', 'user')
      .where('user.id = :id', {
        id: userId
      })
      .skip(skip)
      .take(take)

    applyFilter(query, filter, TABLE_NAME, ['name'])
    return query.getManyAndCount()
  }

  public countByRead(userId: number): Promise<number> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoin('notifications.user', 'user')
      .where('user.id = :id', {
        id: userId
      })
      .andWhere('notifications.isRead = :isRead', {
        isRead: false
      })
    return query.getCount()
  }

  public getById(id: number): Promise<NotificationEntity> {
    const query = this.createQueryBuilder(TABLE_NAME).where(
      `${TABLE_NAME}.id = :id`,
      { id }
    )

    return query.getOne()
  }

  public getByUserId(id: number): Promise<NotificationEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoin(`${TABLE_NAME}.user`, 'user')
      .where(`user.id = :id`, { id })

    return query.getOne()
  }
}
