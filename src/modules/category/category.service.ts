import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { CategoryMapper } from './category.mapper'
import { CategoryRepository } from './category.repository'
import { CreateCategoryRequestDto } from './dtos/create-category-request.dto'
import { UpdateCategoryRequestDto } from './dtos/update-category-request.dto'
import { MessageSuccesses } from 'src/interfaces/message.success'
import { removeEmpty } from '@common/functions'

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private configService: ConfigService
  ) {}

  public async create(dto: CreateCategoryRequestDto) {
    try {
      let entity = await CategoryMapper.toCreate(dto)
      entity = await this.categoryRepository.save(entity)
      return CategoryMapper.toDto(entity, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async get(pagination: PaginationRequest<QueryRequest>) {
    try {
      const [list, count] = await this.categoryRepository.getAndCount(
        pagination
      )

      if (pagination.page === undefined && pagination.perPage === undefined) {
        return { content: list }
      }

      return Pagination.of(pagination, count, list)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async getById(id: number) {
    const category = await this.categoryRepository.getById(id)

    if (!category) {
      throw new CommonException(
        ErrorType.CATEGORY_NOT_FOUND,
        ErrorMessage.CATEGORY_NOT_FOUND
      )
    }
    return CategoryMapper.toDto(category, this.configService)
  }

  public async update(id: number, dto: UpdateCategoryRequestDto) {
    try {
      removeEmpty(dto)

      await this.categoryRepository.update(id, dto)
      const category = await this.getById(id)
      return category
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async delete(id: number) {
    try {
      const category = await this.getById(id)
      if (!category)
        throw new CommonException(
          ErrorType.CATEGORY_NOT_FOUND,
          ErrorMessage.CATEGORY_NOT_FOUND
        )
      await this.categoryRepository.softDelete(id)
      return MessageSuccesses.DELETE_SUCCESS
    } catch (error) {
      throw new CommonException(ErrorType.CATEGORY_NOT_FOUND, error.message)
    }
  }
}
