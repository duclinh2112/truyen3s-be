import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { CreateChildCategoryDto } from './dto/create-child-category.dto'
import { UpdateChildCategoryDto } from './dto/update-child-category.dto'
import { ChildCategoriesService } from './child.categories.service'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { JwtAuthGuard, Permissions, PermissionsGuard, TOKEN_NAME } from '@auth'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'
import { PaginationParams } from '@common/decorators'
import { QueryRequest } from 'src/helpers/query.request'
import { PaginationRequest } from '@common/interfaces'

@ApiTags('Child Category Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('child-categories')
export class ChildCategoriesController {
  constructor(
    private readonly childCategoriesService: ChildCategoriesService
  ) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiOperation({
    summary: 'Create new child category',
    description: 'Create new child category'
  })
  @Post()
  create(@Body(ValidationPipe) createChildCategoryDto: CreateChildCategoryDto) {
    return this.childCategoriesService.create(createChildCategoryDto)
  }

  @ApiOperation({ description: 'Get list child category' })
  @ApiQuery({
    name: 'filter',
    required: false,
    example: '{"q":"", "category_id":1}'
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    isArray: true,
    example: ['["id", "DESC"]']
  })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  findAll(@PaginationParams() pagination: PaginationRequest<QueryRequest>) {
    return this.childCategoriesService.findAll(pagination)
  }

  @ApiOperation({ description: 'Get child category by id' })
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get(':id')
  findOne(@Param() params) {
    return this.childCategoriesService.findOne(params.id)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update child Category' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateChildCategoryDto: UpdateChildCategoryDto
  ) {
    return this.childCategoriesService.update(+id, updateChildCategoryDto)
  }

  @UseGuards(JwtAuthGuard)
  @Permissions(EPermissions.ADMIN_ROOT)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Delete child Category' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childCategoriesService.remove(+id)
  }
}
