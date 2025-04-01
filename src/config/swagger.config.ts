import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { AUTH_OPTIONS, TOKEN_NAME } from 'src/modules/auth'
import { ConfigService } from '@nestjs/config'

const title = 'Tibe Api Swagger'
const description = 'Tibe App'
const version = '1.0'

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const configSwagger = (
  app: INestApplication,
  configService: ConfigService
) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .addServer(configService.get('BASE_URL') + '/api/v1')
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('swagger', app, document)
}
