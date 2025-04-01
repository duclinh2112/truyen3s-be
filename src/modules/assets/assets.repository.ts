import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { EntityRepository, Repository } from 'typeorm'
import { AssetsEntity } from './assets.entity'
import { UserEntity } from '../users/entities/user.entity'
import { EAssetType } from './dtos/upload-photo.response.dto'
import { applySort } from '@common/functions'

@EntityRepository(AssetsEntity)
export class AssetsRepository extends Repository<AssetsEntity> {
  public getAndCount(
    pagination: PaginationRequest<QueryRequest>,
    user?: UserEntity,
    isSuperUser?: boolean
  ): Promise<[entity: AssetsEntity[], total: number]> {
    const { skip, perPage: take, filter, sort } = pagination
    const type = filter && JSON.parse(filter)?.type

    const query = this.createQueryBuilder('assets')
    if (isSuperUser) {
      query
        .leftJoinAndSelect('assets.user', 'user')
        .where('assets.asset_type = :asset_type', {
          asset_type: type || EAssetType.IMAGE
        })
    } else {
      query
        .leftJoinAndSelect('assets.user', 'user')
        .where('assets.user_id = :user_id', { user_id: user.id })
        .andWhere('assets.asset_type = :asset_type', {
          asset_type: type || EAssetType.IMAGE
        })
    }
    applySort(query, sort, 'assets')
    query.skip(skip).take(take)

    return query.getManyAndCount()
  }

  public getAndCountVideos(
    pagination: PaginationRequest<QueryRequest>,
    user?: UserEntity,
    isSuperUser?: boolean
  ): Promise<[entity: AssetsEntity[], total: number]> {
    const { skip, perPage: take } = pagination

    const query = this.createQueryBuilder('assets')
    if (isSuperUser) {
      query
        .leftJoinAndSelect('assets.user', 'user')
        .where('assets.asset_type = :asset_type', {
          asset_type: EAssetType.VIDEO
        })
    } else {
      query
        .leftJoinAndSelect('assets.user', 'user')
        .where('assets.user_id = :user_id', { user_id: user.id })
        .andWhere('assets.asset_type = :asset_type', {
          asset_type: EAssetType.VIDEO
        })
    }

    query.skip(skip).take(take)

    return query.getManyAndCount()
  }
}
