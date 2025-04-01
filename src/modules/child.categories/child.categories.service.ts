import { Injectable } from '@nestjs/common'
import { CreateChildCategoryDto } from './dto/create-child-category.dto'
import { UpdateChildCategoryDto } from './dto/update-child-category.dto'
import { ChildCategoryRepository } from './child.categories.repository'
import { CommonException } from '@common/exceptions'
import { ErrorType } from 'src/interfaces/enums'
import { ChildCategoryMapper } from './child.categories.mapper'
import { PaginationRequest } from '@common/interfaces'
import { QueryRequest } from 'src/helpers/query.request'
import { Pagination } from 'src/helpers'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { removeEmpty } from '@common/functions'
import { MessageSuccesses } from 'src/interfaces/message.success'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ChildCategoriesService {
  constructor(
    private childCategoryRepository: ChildCategoryRepository,
    private configService: ConfigService
  ) {}

  public async create(createChildCategoryDto: CreateChildCategoryDto) {
    try {
      let entity = await ChildCategoryMapper.toCreate(createChildCategoryDto)
      entity = await this.childCategoryRepository.save(entity)

      return ChildCategoryMapper.toDto(entity, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async findAll(pagination: PaginationRequest<QueryRequest>) {
    try {
      const [list, count] = await this.childCategoryRepository.getAndCount(
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

  public async findOne(id: number) {
    const category = await this.childCategoryRepository.getById(id)

    if (!category) {
      throw new CommonException(
        ErrorType.CATEGORY_NOT_FOUND,
        ErrorMessage.TYPE_ENUM
      )
    }
    return ChildCategoryMapper.toDto(category, this.configService)
  }

  public async update(
    id: number,
    updateChildCategoryDto: UpdateChildCategoryDto
  ) {
    try {
      removeEmpty(updateChildCategoryDto)

      await this.childCategoryRepository.update(id, updateChildCategoryDto)
      const category = await this.findOne(id)

      return category
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async remove(id: number) {
    try {
      const category = await this.findOne(id)
      if (!category)
        throw new CommonException(
          ErrorType.CATEGORY_NOT_FOUND,
          ErrorMessage.CATEGORY_NOT_FOUND
        )
      await this.childCategoryRepository.softDelete(id)
      return MessageSuccesses.DELETE_SUCCESS
    } catch (error) {
      throw new CommonException(ErrorType.CATEGORY_NOT_FOUND, error.message)
    }
  }
}
