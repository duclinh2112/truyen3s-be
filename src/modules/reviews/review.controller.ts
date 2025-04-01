import { PaginationParams } from '@common/decorators'
import { PaginationRequest } from '@common/interfaces'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
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
  Permissions,
  PermissionsGuard,
  TOKEN_NAME
} from 'src/modules/auth'
import { UserEntity } from '../users/entities/user.entity'
import { CreateReviewRequestDto } from './dtos/create-review-request.dto'
import { ReviewService } from './review.service'
import { UpdateSettingRequestDto } from '../settings/dtos/update-setting-request.dto'
import { UpdateReviewRequestDto } from './dtos/update-review-request.dto'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'

@ApiTags('Reviews Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ description: 'Create new review' })
  @Post()
  public create(
    @CurrentUser() user: UserEntity,
    @Body(ValidationPipe) dto: CreateReviewRequestDto
  ) {
    return this.reviewService.create(user, dto)
  }

  @ApiOperation({ description: 'Get list reviews' })
  @ApiQuery({
    name: 'filter',
    required: false,
    example: '{"product":"4"}'
  })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  public get(@PaginationParams() pagination: PaginationRequest<QueryRequest>) {
    return this.reviewService.get(pagination)
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update review by id' })
  @Patch(':id')
  public update(
    @Param() params,
    @Body(ValidationPipe) dto: UpdateReviewRequestDto
  ) {
    return this.reviewService.update(params.id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Delete review by id' })
  @Delete(':id')
  public delete(@Param() params) {
    return this.reviewService.delete(params.id)
  }
}
