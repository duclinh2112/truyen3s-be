import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AssetsRepository } from '../assets/assets.repository'
import { ReviewController } from './review.controller'
import { ReviewRepository } from './review.repository'
import { ReviewService } from './review.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewRepository, AssetsRepository]),
    ConfigModule
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
