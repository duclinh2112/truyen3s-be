import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { SettingEntity } from './setting.entity'
import { applyFilter } from '@common/functions'

const TABLE_NAME = 'settings'

@EntityRepository(SettingEntity)
export class SettingRepository extends Repository<SettingEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<[entity: SettingEntity[], total: number]> {
    const { skip, perPage: take, filter } = pagination
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .skip(skip)
      .take(take)

    applyFilter(query, filter, TABLE_NAME, ['name'])
    return query.getManyAndCount()
  }

  public getById(id: number): Promise<SettingEntity> {
    const query = this.createQueryBuilder(TABLE_NAME)
      .leftJoinAndSelect(`${TABLE_NAME}.image`, 'image')
      .where(`${TABLE_NAME}.id = :id`, { id })

    return query.getOne()
  }
}
