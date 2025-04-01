import { Module } from '@nestjs/common'
import { ChaptersService } from './chapters.service'
import { ChaptersController } from './chapters.controller'
import { ChapterEntity } from './entities/chapter.entity'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChapterRepository } from './chapter.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ChapterRepository]), ConfigModule],
  controllers: [ChaptersController],
  providers: [ChaptersService]
})
export class ChaptersModule {}
