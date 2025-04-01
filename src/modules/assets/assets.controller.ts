import { PaginationParams } from '@common/decorators'
import { MessageResponse } from '@common/interceptors/message.response'
import { PaginationRequest } from '@common/interfaces'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'
import { MulterError, diskStorage } from 'multer'
import { extname } from 'path'
import { QueryRequest } from 'src/helpers/query.request'
import {
  CurrentUser,
  JwtAuthGuard,
  PermissionsGuard,
  TOKEN_NAME
} from 'src/modules/auth'
import { UserEntity } from '../users/entities/user.entity'
import { AssetsService } from './assets.service'
import { DeletePhotoRequestDto } from './dtos/delete-photo.request.dto'

@ApiTags('Assets Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('assets')
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (
          file.originalname
            .toLowerCase()
            .match(/^.*\.(jpg|webp|png|jpeg|svg|gif)$/)
        )
          cb(null, true)
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false)
        }
      },
      limits: { fileSize: 1024 * 1024 * 5 },
      storage: diskStorage({
        destination: './files',
        filename: (_req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          cb(null, `${randomName}${extname(file?.originalname)}`)
        }
      })
    })
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Query() query,
    @CurrentUser() user: UserEntity
  ) {
    return this.assetsService.uploadFile(file, query, user)
  }

  @Get(':fileId')
  get(@Param('fileId') fileId, @Res() res) {
    return this.assetsService.readFile(fileId, 'files', res)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiQuery({
    name: 'sort',
    required: false,
    isArray: true,
    example: ['["id", "DESC"]']
  })
  @Get()
  list(
    @PaginationParams() pagination: PaginationRequest<QueryRequest>,
    @CurrentUser() user: UserEntity
  ) {
    return this.assetsService.list(pagination, user)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete()
  delete(@Body() request: DeletePhotoRequestDto): Promise<MessageResponse> {
    return this.assetsService.delete(request)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('videos/all')
  listVideo(
    @PaginationParams() pagination: PaginationRequest<QueryRequest>,
    @CurrentUser() user: UserEntity
  ) {
    return this.assetsService.listVideo(pagination, user)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post('video')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 15 },
      storage: diskStorage({
        destination: './videos',
        filename: (_req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          cb(null, `${randomName}${extname(file?.originalname)}`)
        }
      })
    })
  )
  uploadVideo(
    @UploadedFile()
    file: Express.Multer.File,
    @CurrentUser() user: UserEntity
  ) {
    return this.assetsService.uploadVideo(file, user)
  }

  @Get('videos/:fileId')
  getVideo(@Param('fileId') fileId, @Res() res) {
    return this.assetsService.readFile(fileId, 'videos', res)
  }
}
