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
import { CategoryService } from './category.service'
import { CreateCategoryRequestDto } from './dtos/create-category-request.dto'
import { UpdateCategoryRequestDto } from './dtos/update-category-request.dto'

@ApiTags('Category Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiOperation({
    summary: 'Create new category',
    description: 'Create new category'
  })
  @Post()
  public create(@Body(ValidationPipe) dto: CreateCategoryRequestDto) {
    return this.categoryService.create(dto)
  }

  @ApiOperation({ description: 'Get list category' })
  @ApiQuery({
    name: 'sort',
    required: false,
    isArray: true,
    example: ['["id", "DESC"]']
  })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  public get(@PaginationParams() pagination: PaginationRequest<QueryRequest>) {
    return this.categoryService.get(pagination)
  }

  @ApiOperation({ description: 'Get category by id' })
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get(':id')
  public getById(@Param() params) {
    return this.categoryService.getById(params.id)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update Category' })
  @Patch(':id')
  public update(
    @Param() params,
    @Body(ValidationPipe) dto: UpdateCategoryRequestDto
  ) {
    return this.categoryService.update(params.id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Delete Category' })
  @Delete(':id')
  public delete(@Param() params) {
    return this.categoryService.delete(params.id)
  }
}
