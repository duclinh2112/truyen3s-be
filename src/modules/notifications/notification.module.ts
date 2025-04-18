import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationController } from './notification.controller'
import { NotificationRepository } from './notification.repository'
import { NotificationService } from './notification.service'

@Module({
  imports: [TypeOrmModule.forFeature([NotificationRepository]), ConfigModule],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
