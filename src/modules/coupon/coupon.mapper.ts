import { CouponEntity } from './coupon.entity'
import { CouponResponseDto } from './dtos/coupon-response.dto'
import { CreateCouponRequestDto } from './dtos/create-coupon-request.dto'

export class CouponMapper {
  public static toDto(entity: CouponEntity) {
    const dto = new CouponResponseDto()
    dto.id = entity.id
    dto.code = entity.code
    dto.description = entity.description
    dto.type = entity.type
    dto.value = entity.value
    dto.applicableDate = entity.applicableDate
    dto.expirationDate = entity.expirationDate
    dto.active = entity.active
    return dto
  }

  public static async toCreate(
    dto: CreateCouponRequestDto
  ): Promise<CouponEntity> {
    const {
      code,
      description,
      type,
      value,
      applicableDate,
      expirationDate,
      active
    } = dto
    const entity = new CouponEntity()
    entity.code = code
    entity.description = description
    entity.type = type
    entity.value = value
    entity.applicableDate = applicableDate
    entity.expirationDate = expirationDate
    entity.active = active
    return entity
  }
}
