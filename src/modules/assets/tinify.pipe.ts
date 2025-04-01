import { Injectable, PipeTransform } from '@nestjs/common'
import tinify from 'tinify'
import * as fs from 'fs'

@Injectable()
export class TinifyPipe implements PipeTransform<Express.Multer.File> {
  async transform(image: Express.Multer.File) {
    const imageName = image.filename
    fs.readFile(`./files/${imageName}`, async function (err, sourceData) {
      if (err) {
        console.log(err)
        throw err
      }
      // resize, convert and replace image
      tinify
        .fromBuffer(sourceData)
        .convert({ type: ['image/webp'] })
        .toFile(`./files/${imageName}`)
    })

    return image
  }
}
