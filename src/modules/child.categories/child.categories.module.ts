import { Module } from '@nestjs/common'
import { ChildCategoriesController } from './child.categories.controller'
import { ChildCategoriesService } from './child.categories.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ChildCategoryRepository } from './child.categories.repository'
import { CategoryRepository } from '../category/category.repository'
import { CategoryExistValidator } from '@common/validations/category/category.validator'

@Module({
  imports: [
    TypeOrmModule.forFeature([ChildCategoryRepository, CategoryRepository]),
    ConfigModule
  ],
  controllers: [ChildCategoriesController],
  providers: [ChildCategoriesService, CategoryExistValidator]
})
export class ChildCategoriesModule {}
