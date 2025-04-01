import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CategoryRepository } from './category.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), ConfigModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
