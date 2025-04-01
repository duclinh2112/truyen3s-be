/**
 * Interface intended for requesting results paginated
 */

import { ETypes } from 'src/interfaces/enums/type.enum'

export interface ISort {
  [field: string]: 'ASC' | 'DESC'
}

export interface PaginationRequest<T> {
  skip: number
  page?: number
  perPage?: number
  sort?: string[] | string
  type?: ETypes
  filter?: string
  range?: string
  // Other params of type T
  query?: T
}
