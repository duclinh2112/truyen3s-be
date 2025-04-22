import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  UseGuards
} from '@nestjs/common'
import { ChaptersService } from './chapters.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { PaginationParams } from '@common/decorators'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { JwtAuthGuard, Permissions, PermissionsGuard } from '@auth'
import { EPermissions } from 'src/interfaces/enums/permissions.enum'

@ApiTags('Chapter Controller')
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT, EPermissions.ADMIN_ACCESS_COMICS_CREATE)
  @ApiOperation({
    summary: 'Create new chapter',
    description: 'Create new chapter'
  })
  @Post()
  create(@Body(ValidationPipe) createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto)
  }

  @ApiOperation({ description: 'Get list chapters' })
  @ApiQuery({
    name: 'filter',
    required: false,
    example: '{"q":"", "comic_slug":""}'
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
    return this.chaptersService.findAll(pagination)
  }

  @ApiOperation({ description: 'Get Stt Chapter' })
  @ApiQuery({ name: 'id', required: true })
  @Get('/get-stt-chapter')
  getSttChapter(@Query('id') id: string) {
    return this.chaptersService.getStt(+id)
  }

  @ApiOperation({ description: 'Get chapter by id' })
  @ApiQuery({ name: 'slug', required: true })
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chaptersService.findOne(+id)
  }

  @ApiOperation({ description: 'Get first chapter by slug comic' })
  @ApiParam({ name: 'slug', required: true })
  @Get('/first/:slug')
  findFirstChapter(@Param('slug') slug: string) {
    return this.chaptersService.findFirstChapter(slug)
  }

  @ApiOperation({ description: 'Read chapter' })
  @ApiQuery({ name: 'slug', required: true })
  @ApiParam({ name: 'id', example: 1, required: true })
  @Get('/read/:id')
  read(@Query('slug') slug: string, @Param('id') id: string) {
    return this.chaptersService.read(slug, +id)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT, EPermissions.ADMIN_ACCESS_COMICS_UPDATE)
  @ApiParam({ name: 'id', example: 1, required: true })
  @ApiOperation({ description: 'Update Chapter' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateChapterDto: UpdateChapterDto
  ) {
    return this.chaptersService.update(+id, updateChapterDto)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(EPermissions.ADMIN_ROOT, EPermissions.ADMIN_ACCESS_COMICS_DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(+id)
  }
}
