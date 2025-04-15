import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WishlistController } from './wishlist.controller'
import { WishlistService } from './wishlist.service'
import { WishlistRepository } from './wishlist.repository'
import { ComicRepository } from '../comics/comic.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([WishlistRepository, ComicRepository]),
    ConfigModule
  ],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistModule {}
