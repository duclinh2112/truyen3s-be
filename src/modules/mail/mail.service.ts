import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserEntity } from '../users/entities/user.entity'

interface IOrder {
  email: string
  orderId: number
  phone: string
  total: number
}

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendMailConfirmation(user: UserEntity, token: string) {
    const MAIL_PATH =
      this.configService.get('BASE_URL') + '/api/v1/auth/token/verify?token='
    const url = `${MAIL_PATH}${token}`

    await this.mailerService.sendMail({
      to: user?.email,
      from: '"Tibe" <varum.technology@gmail.com>',
      subject: 'Xác thực Email',
      template: './mail-confirm', // `.hbs` extension is appended automatically
      context: {
        name: user.fullName,
        url: url
      }
    })
  }

  async sendMailResetPassword(user: UserEntity, emailCode: number | string) {
    await this.mailerService.sendMail({
      from: '"Tibe" <varum.technology@gmail.com>',
      to: user?.email,
      subject: 'Thay đổi mật khẩu',
      template: './mail-reset-password',
      context: {
        name: user.fullName,
        emailCode: emailCode
      }
    })
  }
}
