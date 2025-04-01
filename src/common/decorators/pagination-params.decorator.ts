import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { DefaultPagination } from '../interfaces/default-pagination.interface'

/**
 * Decorator intended for building a PaginationRequest object based on the query string parameters
 */
export const PaginationParams = createParamDecorator(
  (
    data: DefaultPagination<unknown> = {
      defaultSkip: 0,
      defaultPage: 0,
      defaultLimit: 10,
      defaultOrder: {},
      defaultOrderDirection: 'ASC',
      maxAllowedSize: 100
    },
    ctx: ExecutionContext
  ) => {
    const request = ctx.switchToHttp().getRequest()
    const { query = {} } = request || {}
    let { skip, page, perPage } = query
    const { sort } = query
    const {
      defaultSkip,
      defaultPage,
      defaultLimit,
      defaultOrder,
      maxAllowedSize
    } = data

    const order = sort || defaultOrder

    if (!page && !perPage) {
      return {
        ...(data ? data : {}),
        ...query,
        skip: undefined,
        page: undefined,
        perPage: undefined,
        sort: order
      }
    }

    perPage = perPage && perPage > 0 ? +perPage : defaultLimit

    if (!skip) {
      if (page) {
        skip = (+page - 1) * +perPage
        skip = skip >= 0 ? skip : 0
      } else {
        page = defaultPage
        skip = defaultSkip
      }
    } else {
      page = Math.floor(+skip / perPage)
    }

    perPage = +perPage < +maxAllowedSize ? perPage : maxAllowedSize
    return {
      ...(data ? data : {}),
      ...query,
      skip: skip,
      page: page,
      perPage: perPage,
      sort: order
    }
  }
)
