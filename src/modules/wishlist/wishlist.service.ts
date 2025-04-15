import { CommonException } from '@common/exceptions'
import { Injectable } from '@nestjs/common'
import { ErrorType } from 'src/interfaces/enums'
import { WishlistRepository } from './wishlist.repository'
import { UserEntity } from '../users/entities/user.entity'
import { AddWishlistRequestDto } from './dtos/add-wishlist.dto'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { Pagination } from 'src/helpers'
import { ComicRepository } from '../comics/comic.repository'

@Injectable()
export class WishlistService {
  constructor(
    private wishlistRepository: WishlistRepository,
    private comicRepository: ComicRepository
  ) {}

  public async get(
    pagination: PaginationRequest<QueryRequest>,
    user: UserEntity
  ) {
    try {
      const userWishlist = await this.wishlistRepository.getByUserId(user.id)
      if (userWishlist) {
        const { comicIds = [] } = userWishlist
        const [list, count] = await this.comicRepository.getAndCountByIds(
          comicIds,
          pagination
        )
        return Pagination.of(pagination, count, list)
      } else return Pagination.of(pagination, 0, [])
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
  public async add(dto: AddWishlistRequestDto, user: UserEntity) {
    try {
      const { id } = dto
      const userWishlist = await this.wishlistRepository.getByUserId(user.id)
      if (userWishlist) {
        const { comicIds = [] } = userWishlist
        if (!comicIds.includes(id.toString())) {
          comicIds.push(id.toString())
        }
        const entity = await this.wishlistRepository.save({
          comicIds,
          id: userWishlist.id
        })
        return entity
      } else {
        const entity = await this.wishlistRepository.save({
          user,
          productIds: [id.toString()]
        })
        return entity
      }
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
  public async remove(dto: AddWishlistRequestDto, user: UserEntity) {
    try {
      const { id } = dto
      const userWishlist = await this.wishlistRepository.getByUserId(user.id)
      if (userWishlist) {
        const { comicIds = [] } = userWishlist
        const newIds = comicIds.filter((prodId) => prodId !== id.toString())
        const entity = await this.wishlistRepository.save({
          comicIds: newIds,
          id: userWishlist.id
        })
        return entity
      } else {
        throw new CommonException(
          ErrorType.NOT_FOUND,
          ErrorMessage.WISHLIST_NOT_FOUND
        )
      }
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
  public async check(dto, user: UserEntity) {
    try {
      const userWishlist = await this.wishlistRepository.getByUserId(user.id)
      const { id } = dto
      if (userWishlist) {
        const isWishlist = userWishlist.comicIds.find((item) => item == id)
        return Boolean(isWishlist)
      } else return false
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
}
