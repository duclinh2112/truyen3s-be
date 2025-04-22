import { Injectable } from '@nestjs/common'
import { CreateAuthorDto } from './dto/create-author.dto'
import { UpdateAuthorDto } from './dto/update-author.dto'
import { UserEntity } from '../users/entities/user.entity'
import { AuthorMapper } from './author.mapper'
import { AuthorRepository } from './author.repository'
import { CommonException } from '@common/exceptions'
import { ErrorType } from 'src/interfaces/enums'
import { ComicRepository } from '../comics/comic.repository'
import { QueryRequest } from 'src/helpers/query.request'
import { PaginationRequest } from '@common/interfaces'
import { Pagination } from 'src/helpers'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { ConfigService } from '@nestjs/config'
import { AssetsMapper } from '../assets/assets.mapper'

@Injectable()
export class AuthorsService {
  constructor(
    private authorRepository: AuthorRepository,
    private comicRepository: ComicRepository,
    private configService: ConfigService
  ) {}

  public async create(createAuthorDto: CreateAuthorDto, user: UserEntity) {
    try {
      let entity = await AuthorMapper.toCreate(createAuthorDto, user)
      entity = await this.authorRepository.create(entity)

      return AuthorMapper.toDto(entity)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async findAll(pagination: PaginationRequest<QueryRequest>) {
    try {
      const [list, count] = await this.authorRepository.getAndCount(pagination)

      return Pagination.of(pagination, count, list)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async findOne(id: number) {
    const author = await this.authorRepository.getById(id)

    if (!author) {
      throw new CommonException(
        ErrorType.PRODUCT_NOT_FOUND,
        ErrorMessage.PRODUCT_NOT_FOUND
      )
    }

    return AuthorMapper.toDto(author)
  }

  public async getAuthorComics(
    pagination: PaginationRequest<QueryRequest>,
    user: UserEntity
  ) {
    try {
      const [list, count] = await this.comicRepository.getComicsByAuthor(
        pagination,
        user
      )
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

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`
  }

  remove(id: number) {
    return `This action removes a #${id} author`
  }
}
