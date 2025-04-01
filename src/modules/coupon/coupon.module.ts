import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CouponController } from './coupon.controller'
import { CouponRepository } from './coupon.repository'
import { CouponService } from './coupon.service'

@Module({
  imports: [TypeOrmModule.forFeature([CouponRepository]), ConfigModule],
  controllers: [CouponController],
  providers: [CouponService]
})
export class CouponModule {}
