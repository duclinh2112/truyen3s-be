import { ConfigModule, ConfigService } from '@nestjs/config'
import { TokenService } from './services/token.service'
import { AuthService } from './services/auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from './jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { UsersRepository } from 'src/modules/users/repositories/user.repository'
import { MailModule } from '../mail/mail.module'
import { RolesRepository } from '../roles/role.repository'
import { UsersCodeRepository } from '../users/repositories/user-code.repository'
import { AssetsRepository } from '../assets/assets.repository'

@Global()
@Module({
  imports: [
    ConfigModule,
    MailModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      RolesRepository,
      UsersCodeRepository,
      AssetsRepository
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('ACCESS_TOKEN_EXPIRES_IN')
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenService],
  exports: [JwtStrategy, PassportModule, TokenService, AuthService]
})
export class AuthModule {}
