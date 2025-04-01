import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AssetsRepository } from '../assets/assets.repository'
import { SettingController } from './setting.controller'
import { SettingRepository } from './setting.repository'
import { SettingService } from './setting.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingRepository, AssetsRepository]),
    ConfigModule
  ],
  controllers: [SettingController],
  providers: [SettingService]
})
export class SettingModule {}
