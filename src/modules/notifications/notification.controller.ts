import { PaginationParams } from '@common/decorators'
import { PaginationRequest } from '@common/interfaces'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { QueryRequest } from 'src/helpers/query.request'
import {
  CurrentUser,
  JwtAuthGuard,
  PermissionsGuard,
  TOKEN_NAME
} from 'src/modules/auth'
import { UserEntity } from '../users/entities/user.entity'
import { NotificationService } from './notification.service'

@ApiTags('Notification Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ description: 'Get list notification' })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @Get()
  public get(
    @PaginationParams() pagination: PaginationRequest<QueryRequest>,
    @CurrentUser() user: UserEntity
  ) {
    return this.notificationService.get(pagination, user)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('count')
  public getUnRead(@CurrentUser() user: UserEntity) {
    return this.notificationService.countUnRead(user)
  }

  @ApiParam({ name: 'id', required: true, example: 1 })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get(':id')
  public read(@Param() params) {
    return this.notificationService.read(params)
  }
}
