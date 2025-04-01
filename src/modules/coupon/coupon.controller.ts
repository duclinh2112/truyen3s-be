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
import { EPermissions } from 'src/interfaces/enums/permissions.enum'
import {
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  TOKEN_NAME
} from 'src/modules/auth'
import { CouponService } from './coupon.service'
import { CreateCouponRequestDto } from './dtos/create-coupon-request.dto'
import { UpdateCouponRequestDto } from './dtos/update-coupon-request.dto'

@ApiTags('Coupon Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('coupons')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiOperation({ description: 'Create new coupon' })
  @Post()
  public create(@Body(ValidationPipe) dto: CreateCouponRequestDto) {
    return this.couponService.create(dto)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiOperation({ description: 'Get list coupon' })
  @ApiQuery({
    name: 'filter',
    required: false,
    example: '{"q":"DISCOUNT"}'
  })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  public get(@PaginationParams() pagination: PaginationRequest<QueryRequest>) {
    return this.couponService.get(pagination)
  }

  @ApiOperation({ description: 'Get coupon by id' })
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get(':id')
  public getById(@Param() params) {
    return this.couponService.getById(params.id)
  }

  @ApiOperation({ description: 'Get coupon by code' })
  @ApiParam({ name: 'code', example: 'DISCOUNT_10K', required: true })
  @Get('code/:code')
  public getByCode(@Param() params) {
    return this.couponService.getByCode(params.code)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update coupon' })
  @Patch(':id')
  public update(
    @Param() params,
    @Body(ValidationPipe) dto: UpdateCouponRequestDto
  ) {
    return this.couponService.update(params.id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Delete coupon' })
  @Delete(':id')
  public delete(@Param() params) {
    return this.couponService.delete(params.id)
  }
}
