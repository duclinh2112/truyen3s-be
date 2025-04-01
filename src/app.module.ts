import { Unique } from '@common/validations/unique/unique'
import { defaultConnection } from '@config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AssetsModule } from './modules/assets/assets.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { CouponModule } from './modules/coupon/coupon.module'
import { PermissionsModule } from './modules/permissions/permission.module'
import { ReviewModule } from './modules/reviews/review.module'
import { RolesModule } from './modules/roles/role.module'
import { SeedModule } from './modules/seeds/seed.module'
import { SettingModule } from './modules/settings/setting.module'
import { UserModule } from './modules/users/user.module'
import { NotificationModule } from './modules/notifications/notification.module'
import { ComicsModule } from './modules/comics/comics.module'
import { ChildCategoriesModule } from './modules/child.categories/child.categories.module'
import { ChaptersModule } from './modules/chapters/chapters.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: defaultConnection,
      inject: [ConfigService]
    }),
    SeedModule,
    AssetsModule,
    AuthModule,
    UserModule,
    ReviewModule,
    CategoryModule,
    SettingModule,
    CouponModule,
    NotificationModule,
    RolesModule,
    PermissionsModule,
    ComicsModule,
    ChildCategoriesModule,
    ChaptersModule
    // LoggerModule
  ],
  providers: [Unique]
})
export class AppModule {}
