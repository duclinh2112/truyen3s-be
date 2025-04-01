import { Injectable } from '@nestjs/common'
import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { AssetsRepository } from 'src/modules/assets/assets.repository'

@ValidatorConstraint({ name: 'assetExistRule', async: true })
@Injectable()
export class AssetExistValidator implements ValidatorConstraintInterface {
  constructor(private assetsRepository: AssetsRepository) {}

  async validate(ids: number | number[]) {
    try {
      if (typeof ids === 'number') {
        const asset = await this.assetsRepository.findOne(ids)
        if (!asset) return false
      } else {
        const assets = await this.assetsRepository.findByIds(ids)
        if (assets.length !== ids.length) return false
      }
    } catch (e) {
      return false
    }

    return true
  }

  defaultMessage() {
    // can pass ValidationArguments as an argument
    return `Photo or file not found`
  }
}
