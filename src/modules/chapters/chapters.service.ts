import { Injectable } from '@nestjs/common'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'
import { ChapterRepository } from './chapter.repository'
import { ConfigService } from '@nestjs/config'
import { CommonException } from '@common/exceptions'
import { ErrorType } from 'src/interfaces/enums'
import { ChapterMapper } from './chapter.mappter'
import { PaginationRequest } from '@common/interfaces'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { removeEmpty } from '@common/functions'

@Injectable()
export class ChaptersService {
  constructor(
    private chapterRepository: ChapterRepository,
    private configService: ConfigService
  ) {}
  public async create(createChapterDto: CreateChapterDto) {
    try {
      let entity = await ChapterMapper.toCreate(createChapterDto)
      entity = await this.chapterRepository.save(entity)

      return ChapterMapper.toDto(entity, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async findAll(pagination: PaginationRequest<QueryRequest>) {
    try {
      const [list, count] = await this.chapterRepository.getAndCount(pagination)
      if (pagination.page === undefined && pagination.perPage === undefined) {
        return { content: list }
      }

      return Pagination.of(pagination, count, list)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async findOne(id: number) {
    try {
      const chapter = await this.chapterRepository.getById(id)

      if (!chapter) {
        throw new CommonException(
          ErrorType.PRODUCT_NOT_FOUND,
          ErrorMessage.PRODUCT_NOT_FOUND
        )
      }

      return ChapterMapper.toDto(chapter, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async findFirstChapter(slugComic: string) {
    try {
      const chapter = await this.chapterRepository.getFirstChapter(slugComic)

      if (!chapter) {
        throw new CommonException(
          ErrorType.PRODUCT_NOT_FOUND,
          ErrorMessage.PRODUCT_NOT_FOUND
        )
      }

      return ChapterMapper.toDto(chapter, this.configService)
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async read(slugComic: string, id: number) {
    try {
      const chapter = await this.chapterRepository.read(slugComic, id)

      if (!chapter) {
        throw new CommonException(
          ErrorType.PRODUCT_NOT_FOUND,
          ErrorMessage.PRODUCT_NOT_FOUND
        )
      }

      const [prevChapter, nextChapter] = await Promise.all([
        this.chapterRepository.getPrevChapter(slugComic, chapter.id),
        this.chapterRepository.getNextChapter(slugComic, chapter.id)
      ])

      return {
        data: await ChapterMapper.toDto(chapter, this.configService),
        prevChapter,
        nextChapter
      }
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async getStt(id: number) {
    try {
      const sttChapter = await this.chapterRepository.getSttChapter(id)
      return sttChapter
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  public async update(id: number, updateChapterDto: UpdateChapterDto) {
    try {
      removeEmpty(updateChapterDto)

      await this.chapterRepository.update(id, updateChapterDto)
      const chapter = await this.chapterRepository.findOne({ id: id })
      return chapter
    } catch (error) {
      throw new CommonException(ErrorType.INTERNAL_SERVER, error.message)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`
  }
}
