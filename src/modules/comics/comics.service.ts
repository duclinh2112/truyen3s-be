import { Injectable } from '@nestjs/common'
import { CreateComicDto } from './dto/create-comic.dto'
import { UpdateComicDto } from './dto/update-comic.dto'
import { UserEntity } from '../users/entities/user.entity'
import { ComicRepository } from './comic.repository'
import { ConfigService } from '@nestjs/config'
import { AssetsRepository } from '../assets/assets.repository'
import { CommonException } from '@common/exceptions'
import { ErrorType } from 'src/interfaces/enums'
import { ComicMapper } from './comic.mapper'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { AssetsMapper } from '../assets/assets.mapper'
import { Pagination } from 'src/helpers'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { ChildCategoryEntity } from '../child.categories/entities/child.category.entity'
import { MessageSuccesses } from 'src/interfaces/message.success'
import { UpdateStatusComicDto } from './dto/update-status-comic'

@Injectable()
export class ComicsService {
  constructor(
    private comicRepository: ComicRepository,
    private assetsRepository: AssetsRepository,
    private configService: ConfigService
  ) {}

  public async create(createComicDto: CreateComicDto, user: UserEntity) {
    const image = await this.assetsRepository.findOne({
      id: createComicDto.image
    })

    try {
      let entity = await ComicMapper.toCreate(createComicDto, user)
      entity = await this.comicRepository.save(entity)
      entity.image = image

      return ComicMapper.toDto(entity, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async findAll(pagination: PaginationRequest<QueryRequest>) {
    try {
      const [list, count] = await this.comicRepository.getAndCount(pagination)
      const data = list.map((item) => {
        const { image } = item
        return {
          ...item,
          image: AssetsMapper.toDto(image, this.configService)
        }
      })

      return Pagination.of(pagination, count, data)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async findOne(id: number) {
    const comic = await this.comicRepository.getById(id)

    if (!comic) {
      throw new CommonException(
        ErrorType.PRODUCT_NOT_FOUND,
        ErrorMessage.PRODUCT_NOT_FOUND
      )
    }

    return ComicMapper.toDto(comic, this.configService)
  }

  public async findBySlug(slug: string) {
    const comic = await this.comicRepository.getBySlug(slug)

    if (!comic) {
      throw new CommonException(
        ErrorType.PRODUCT_NOT_FOUND,
        ErrorMessage.PRODUCT_NOT_FOUND
      )
    }

    comic.view += 1
    await this.updateView(comic.id)

    return ComicMapper.toDto(comic, this.configService)
  }

  public async update(id: number, updateComicDto: UpdateComicDto) {
    const existComic = await this.comicRepository.findOne(id)

    if (!existComic) {
      throw new CommonException(ErrorType.NOT_FOUND, ErrorMessage.NOT_FOUND)
    }

    const { childCategoryIds, ...updateDto } = updateComicDto

    try {
      await this.comicRepository.update(id, updateDto)

      if (childCategoryIds?.length) {
        const updatedComic = await this.comicRepository.findOne(id)

        updatedComic.childCategories = childCategoryIds.map(
          (id) => new ChildCategoryEntity({ id })
        )

        await this.comicRepository.save(updatedComic)
      }

      const entity = await this.comicRepository.getById(id)
      return ComicMapper.toDto(entity, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async remove(id: number) {
    try {
      const existComic = await this.comicRepository.findOne(id)

      if (!existComic) {
        throw new CommonException(ErrorType.NOT_FOUND, ErrorMessage.NOT_FOUND)
      }

      await this.comicRepository.delete(id)
      return MessageSuccesses.DELETE_SUCCESS
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async updateView(id: number) {
    const comic = await this.comicRepository.findOne(id)
    comic.view += 1
    await this.comicRepository.save(comic)
  }

  public async updateStatus(id: number, updateStatusDto: UpdateStatusComicDto) {
    const existComic = await this.comicRepository.findOne(id)

    if (!existComic) {
      throw new CommonException(ErrorType.NOT_FOUND, ErrorMessage.NOT_FOUND)
    }

    try {
      await this.comicRepository.update(id, updateStatusDto)

      const entity = await this.comicRepository.getById(id)
      return ComicMapper.toDto(entity, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }
}
