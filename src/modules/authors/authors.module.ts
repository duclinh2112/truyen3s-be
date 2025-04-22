import { Module } from '@nestjs/common'
import { AuthorsService } from './authors.service'
import { AuthorsController } from './authors.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorRepository } from './author.repository'
import { ComicRepository } from '../comics/comic.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository, ComicRepository]),
    ConfigModule
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService]
})
export class AuthorsModule {}
