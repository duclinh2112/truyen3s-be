import { Injectable } from '@nestjs/common'
import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { CategoryRepository } from 'src/modules/category/category.repository'

@ValidatorConstraint({ name: 'categoryExistRule', async: true })
@Injectable()
export class CategoryExistValidator implements ValidatorConstraintInterface {
  constructor(private categoryRepository: CategoryRepository) {}

  async validate(id: number) {
    try {
      const category = await this.categoryRepository.findOne(id)

      if (category.id != id) return false
    } catch (e) {
      return false
    }

    return true
  }

  defaultMessage() {
    // can pass ValidationArguments as an argument
    return `Category not found`
  }
}
