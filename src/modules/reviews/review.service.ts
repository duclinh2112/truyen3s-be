import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { AssetsRepository } from '../assets/assets.repository'
import { CreateReviewRequestDto } from './dtos/create-review-request.dto'
import { UpdateReviewRequestDto } from './dtos/update-review-request.dto'
import { ReviewMapper } from './review.mapper'
import { ReviewRepository } from './review.repository'

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private assetsRepository: AssetsRepository,
    private configService: ConfigService
  ) {}

  public async create(user, dto: CreateReviewRequestDto) {
    try {
      let entity = await ReviewMapper.toCreate(user, dto)
      entity = await this.reviewRepository.save(entity)
      return ReviewMapper.toDto(entity, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async get(pagination: PaginationRequest<QueryRequest>) {
    try {
      let data = []
      const [list, count] = await this.reviewRepository.getAndCount(pagination)
      await Promise.all(
        list.map((item) => {
          const image = this.assetsRepository.findByIds(item.attachments || [])
          return image
        })
      ).then((result) => {
        data = [...list].map((item, idx) => {
          return {
            ...item,
            attachments: result[idx]
          }
        })
      })

      return Pagination.of(pagination, count, data)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async update(id: number, dto: UpdateReviewRequestDto) {
    const { attachments } = dto

    if (attachments && attachments.length) {
      const newPhoto = await this.assetsRepository.findByIds(attachments)
      if (newPhoto.length !== attachments.length)
        throw new CommonException(
          ErrorType.PHOTO_NOT_FOUND,
          ErrorMessage.PHOTO_NOT_FOUND
        )
    }

    try {
      return this.reviewRepository.update(id, dto)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async delete(id: number) {
    try {
      return this.reviewRepository.delete(id)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
}
