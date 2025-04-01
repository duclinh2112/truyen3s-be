import { LoggerService } from '@nestjs/common'

export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.error('\n')
    const today = new Date().toString()
    console.log('---------- START LOG ----------')
    console.log('Date: ', today)
    console.log('Message: ', message)
    console.log('Params: ', optionalParams)
    console.log('---------- END LOG ----------')
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error('\n')
    const today = new Date().toString()
    console.error('---------- START ERROR ----------')
    console.error('Date: ', today)
    console.error('Message: ', message)
    console.error('Params: ', optionalParams)
    console.error('---------- END ERROR ----------')
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.warn(message)
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message)
  }
}
