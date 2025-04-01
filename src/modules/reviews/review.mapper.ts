import { ConfigService } from '@nestjs/config'
import { UserEntity } from '../users/entities/user.entity'
import { CreateReviewRequestDto } from './dtos/create-review-request.dto'
import { ReviewResponseDto } from './dtos/review-response.dto'

import { ReviewEntity } from './review.entity'

export class ReviewMapper {
  public static toDto(entity: ReviewEntity, configService: ConfigService) {
    const dto = new ReviewResponseDto()
    const { id, content, value, attachments = [] } = entity
    dto.id = id
    dto.content = content
    dto.value = value
    dto.attachments = attachments
    return dto
  }

  public static async toCreate(
    user: UserEntity,
    dto: CreateReviewRequestDto
  ): Promise<ReviewEntity> {
    const { content, value, product, attachments = [] } = dto
    const entity = new ReviewEntity()
    entity.content = content
    entity.value = value
    entity.user = user
    entity.attachments = attachments
    return entity
  }
}
