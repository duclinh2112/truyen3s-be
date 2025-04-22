import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards
} from '@nestjs/common'
import { ComicsService } from './comics.service'
import { CreateComicDto } from './dto/create-comic.dto'
import { UpdateComicDto } from './dto/update-comic.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  TOKEN_NAME
} from '@auth'
import { UserEntity } from '../users/entities/user.entity'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'
import { PaginationParams } from '@common/decorators'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { UpdateStatusComicDto } from './dto/update-status-comic'

@ApiTags('Comics Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT, EPermissions.ADMIN_ACCESS_COMICS_CREATE)
  @ApiOperation({
    summary: 'Create new comic',
    description: 'Em là của anh'
  })
  @Post()
  create(
    @Body(ValidationPipe) createComicDto: CreateComicDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.comicsService.create(createComicDto, user)
  }

  @ApiOperation({ description: 'Get list comics' })
  @ApiQuery({
    name: 'filter',
    required: false,
    example: '{"q":"", "category_slug":"abcd", "child_category_slug":"abcd"}'
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    isArray: true,
    example: ['["price", "ASC"]', '["id", "DESC"]']
  })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @Get()
  findAll(@PaginationParams() pagination: PaginationRequest<QueryRequest>) {
    return this.comicsService.findAll(pagination)
  }

  @ApiOperation({ description: 'Get comic by id' })
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get('edit/:id')
  findOne(@Param('id') id: string) {
    return this.comicsService.findOne(+id)
  }

  @ApiOperation({ description: 'Get comic by slug' })
  @ApiParam({ name: 'slug', example: 'react-chat-app', required: true })
  @Get(':slug')
  findBySlug(@Param() params) {
    return this.comicsService.findBySlug(params.slug)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT, EPermissions.ADMIN_ACCESS_COMICS_UPDATE)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update Comic' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateComicDto: UpdateComicDto
  ) {
    return this.comicsService.update(+id, updateComicDto)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT, EPermissions.ADMIN_ACCESS_COMICS_UPDATE)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update Status Comic' })
  @Patch('update-status/:id')
  updateStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStatusComicDto: UpdateStatusComicDto
  ) {
    return this.comicsService.updateStatus(+id, updateStatusComicDto)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT, EPermissions.ADMIN_ACCESS_COMICS_DELETE)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Delete Comic' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicsService.remove(+id)
  }
}
