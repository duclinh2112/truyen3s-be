import { Module } from '@nestjs/common'
import { ComicsService } from './comics.service'
import { ComicsController } from './comics.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ComicRepository } from './comic.repository'
import { AssetsRepository } from '../assets/assets.repository'
import { CategoryExistValidator } from '@common/validations/category/category.validator'
import { CategoryRepository } from '../category/category.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ComicRepository,
      AssetsRepository,
      CategoryRepository
    ]),
    ConfigModule
  ],
  controllers: [ComicsController],
  providers: [ComicsService, CategoryExistValidator]
})
export class ComicsModule {}
