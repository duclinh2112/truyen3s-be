import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import {
  CurrentUser,
  JwtAuthGuard,
  PermissionsGuard,
  TOKEN_NAME
} from 'src/modules/auth'
import { WishlistService } from './wishlist.service'
import { UserEntity } from '../users/entities/user.entity'
import { AddWishlistRequestDto } from './dtos/add-wishlist.dto'
import { PaginationParams } from '@common/decorators'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { CheckWishlistDto } from './dtos/check-wishlist.dto'

@ApiTags('Wishlist Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiOperation({ description: 'Get list wishlist' })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @Get()
  public get(
    @PaginationParams() pagination: PaginationRequest<QueryRequest>,
    @CurrentUser() user: UserEntity
  ) {
    return this.wishlistService.get(pagination, user)
  }

  @ApiOperation({ description: 'Check wishlist by product id' })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post('check')
  public check(
    @Body(ValidationPipe) dto: CheckWishlistDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.wishlistService.check(dto, user)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  public add(
    @Body(ValidationPipe) dto: AddWishlistRequestDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.wishlistService.add(dto, user)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete()
  public remove(
    @Body(ValidationPipe) dto: AddWishlistRequestDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.wishlistService.remove(dto, user)
  }
}
