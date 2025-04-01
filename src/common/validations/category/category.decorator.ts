import { ValidationOptions, registerDecorator } from 'class-validator'
import { CategoryExistValidator } from './category.validator'

export function CategoryExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CategoryExistValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CategoryExistValidator
    })
  }
}
