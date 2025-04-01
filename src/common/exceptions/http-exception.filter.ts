import { error } from 'console'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common'
import { Response } from 'express'
import { ErrorType } from '../../interfaces/enums'
import { HttpErrorType } from './http-error-type'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name, true)
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = +exception.getStatus()

    let { errorType, message } = exception.getResponse() as {
      errorType: ErrorType | string
      message: string | string[]
    }
    if (!errorType) {
      errorType = HttpErrorType[status]
      errorType = errorType ? errorType : 'UNEXPECTED_ERROR'
    }

    if (typeof message === 'string') {
      message = [message]
    }
    this.logger.error(message)
    response.status(HttpStatus.CREATED).json({
      errorType: errorType,
      message: message,
      timestamp: new Date().toISOString()
    })
  }
}
