import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { Injectable } from '@nestjs/common'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { CouponMapper } from './coupon.mapper'
import { CouponRepository } from './coupon.repository'
import { CreateCouponRequestDto } from './dtos/create-coupon-request.dto'
import { UpdateCouponRequestDto } from './dtos/update-coupon-request.dto'

@Injectable()
export class CouponService {
  constructor(private couponRepository: CouponRepository) {}

  public async create(dto: CreateCouponRequestDto) {
    try {
      let entity = await CouponMapper.toCreate(dto)
      entity = await this.couponRepository.save(entity)
      return CouponMapper.toDto(entity)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async get(pagination: PaginationRequest<QueryRequest>) {
    try {
      const [list, count] = await this.couponRepository.getAndCount(pagination)
      return Pagination.of(pagination, count, list)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async getById(id: number) {
    const coupon = await this.couponRepository
      .createQueryBuilder('coupons')
      .where('coupons.id = :id', { id })
      .getOne()

    if (!coupon) {
      throw new CommonException(ErrorType.NOT_FOUND, ErrorMessage.NOT_FOUND)
    }
    return CouponMapper.toDto(coupon)
  }

  public async getByCode(code: string) {
    const coupon = await this.couponRepository
      .createQueryBuilder('coupons')
      .where('coupons.code = :code', { code })
      .andWhere('coupons.active = :active', { active: true })
      .andWhere('coupons.applicableDate <= :applicableDate', {
        applicableDate: new Date()
      })
      .andWhere('coupons.expirationDate > :expirationDate', {
        expirationDate: new Date()
      })
      .getOne()

    if (!coupon) {
      throw new CommonException(ErrorType.COUPON_FAIL, ErrorMessage.COUPON_FAIL)
    }
    return CouponMapper.toDto(coupon)
  }

  public async update(id: number, dto: UpdateCouponRequestDto) {
    try {
      return this.couponRepository.update(id, dto)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async delete(id: number) {
    try {
      return this.couponRepository.delete(id)
    } catch (error) {
      throw new CommonException(ErrorType.NOT_FOUND, error.message)
    }
  }
}
