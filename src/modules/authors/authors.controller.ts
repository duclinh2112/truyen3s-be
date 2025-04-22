import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common'
import { AuthorsService } from './authors.service'
import { CreateAuthorDto } from './dto/create-author.dto'
import { UserEntity } from '../users/entities/user.entity'
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  TOKEN_NAME
} from '@auth'
import { PaginationParams } from '@common/decorators'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'

@ApiTags('Author Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Create new author' })
  @ApiConflictResponse({ description: 'Nickname already exists' })
  @Post()
  create(
    @Body() createAuthorDto: CreateAuthorDto,
    @CurrentUser() currentUser: UserEntity
  ) {
    return this.authorsService.create(createAuthorDto, currentUser)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ACCESS_USERS_LIST)
  @ApiOperation({ description: 'Get list author' })
  @ApiQuery({
    name: 'filter',
    required: false,
    example: '{"q":"nguyenvana"}'
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    isArray: true,
    example: ['["id", "DESC"]']
  })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @Get()
  findAll(@PaginationParams() pagination: PaginationRequest<QueryRequest>) {
    return this.authorsService.findAll(pagination)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Get author information by id' })
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
  //   return this.authorsService.update(+id, updateAuthorDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authorsService.remove(+id)
  // }
}
