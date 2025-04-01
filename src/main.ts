import { HttpExceptionFilter } from '@common/exceptions'
import { HttpResponseInterceptor } from '@common/interceptors'
import { configSwagger } from '@config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { useContainer } from 'class-validator'
import * as compression from 'compression'
import { join } from 'path'
import { AppModule } from './app.module'
import tinify from 'tinify'
import { urlencoded, json } from 'express'
import * as bodyParser from 'body-parser'
import { MyLogger } from './modules/logger/logger.service'

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: new MyLogger()
  })
  // app.useLogger(app.get(MyLogger))
  const configService = app.get(ConfigService)
  const port = configService.get<number>('API_PORT')
  const prefix = configService.get<string>('API_PREFIX')
  const tinifyKey = configService.get<string>('TINIFY_KEY')

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')

  configSwagger(app, configService)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  app.use(bodyParser.json())
  app.use(urlencoded({ limit: '50mb', extended: true }))
  app.use(json({ limit: '50mb' }))
  app.use(compression())
  app.enableCors({
    exposedHeaders: ['X-Total-Count', 'Content-Range']
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new HttpResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(prefix)

  tinify.key = tinifyKey

  await app.listen(port)
  return port
}

bootstrap().then((port: number) => {
  Logger.log(` 🌍  Application running on port: ${port}`, 'Main')
})
