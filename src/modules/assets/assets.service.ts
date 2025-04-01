import { CommonException } from '@common/exceptions'
import { MessageResponse } from '@common/interceptors/message.response'
import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { unlink } from 'fs/promises'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { MessageSuccesses } from 'src/interfaces/message.success'
import { DeletePhotoRequestDto } from './dtos/delete-photo.request.dto'
import { AssetsEntity } from './assets.entity'
import { AssetsMapper } from './assets.mapper'
import { AssetsRepository } from './assets.repository'
import { Pagination } from 'src/helpers'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { UserEntity } from '../users/entities/user.entity'
import { EAssetType } from './dtos/upload-photo.response.dto'

@Injectable()
export class AssetsService {
  constructor(private photoRepository: AssetsRepository) {}

  async uploadFile(
    file: Express.Multer.File,
    query: { type: EAssetType },
    user: UserEntity
  ): Promise<AssetsEntity> {
    try {
      const filename = file?.filename
      const originalname = file?.originalname
      const type = file?.mimetype
      const photo = AssetsMapper.toCreateEntity(filename, type, originalname)
      photo.user = user
      photo.assetType = query.type || EAssetType.IMAGE
      await this.photoRepository.save(photo)

      return photo
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  readFile(fileId: string, path: string, res: Response) {
    res.sendFile(fileId, { root: path }, (error) => {
      if (error) {
        return res.end()
      }
    })
  }

  async list(pagination: PaginationRequest<QueryRequest>, user: UserEntity) {
    try {
      const isSuperUser = user.isSuperUser
      const [list, count] = await this.photoRepository.getAndCount(
        pagination,
        user,
        isSuperUser
      )
      return Pagination.of(pagination, count, list)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  async listVideo(
    pagination: PaginationRequest<QueryRequest>,
    user: UserEntity
  ) {
    try {
      const isSuperUser = user.isSuperUser
      const [list, count] = await this.photoRepository.getAndCountVideos(
        pagination,
        user,
        isSuperUser
      )
      return Pagination.of(pagination, count, list)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  async delete(request: DeletePhotoRequestDto): Promise<MessageResponse> {
    try {
      await unlink(`files/${request.filename}`)
      await this.photoRepository.delete({ name: request.filename })
      return { message: MessageSuccesses.DELETE_SUCCESS }
    } catch (_error) {
      return new CommonException(ErrorType.NOT_FOUND, ErrorMessage.NOT_FOUND)
    }
  }

  async uploadVideo(
    file: Express.Multer.File,
    user: UserEntity
  ): Promise<AssetsEntity> {
    try {
      const filename = file?.filename
      const originalname = file?.originalname
      const type = file?.mimetype
      const video = AssetsMapper.toCreateEntity(filename, type, originalname)
      video.user = user
      video.assetType = EAssetType.VIDEO
      await this.photoRepository.save(video)

      return video
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
}
