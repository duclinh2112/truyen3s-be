import { CommonException } from '@common/exceptions'
import { Injectable } from '@nestjs/common'
import { ErrorType } from 'src/interfaces/enums'
import { UserEntity } from '../users/entities/user.entity'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { Pagination } from 'src/helpers'
import { NotificationRepository } from './notification.repository'
import { SetNotificationDto } from './dtos/set-notification.dto'

@Injectable()
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  public async get(
    pagination: PaginationRequest<QueryRequest>,
    user: UserEntity
  ) {
    try {
      const [list, count] = await this.notificationRepository.getAndCount(
        pagination,
        user.id
      )
      return Pagination.of(pagination, count, list)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async countUnRead(user: UserEntity) {
    try {
      const total = await this.notificationRepository.countByRead(user.id)
      return total
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async set(dto: SetNotificationDto) {
    try {
      const res = await this.notificationRepository.save(dto)
      return res
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async read(dto) {
    try {
      const { id } = dto
      const notification = await this.notificationRepository.findOne(id)
      if (notification) {
        notification.isRead = true
        const res = await this.notificationRepository.save(notification)
        return res
      }
      throw new CommonException(
        ErrorType.NOTIFICATION_NOT_FOUND,
        ErrorMessage.NOTIFICATION_NOT_FOUND
      )
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
}
