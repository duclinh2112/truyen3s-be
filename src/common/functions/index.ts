import { isEmpty } from 'lodash'
import { SelectQueryBuilder } from 'typeorm'

const toSlug = (str: string) => {
  str = str.toLowerCase()

  // xóa dấu
  str = str
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, 'd')

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '')

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)|\-/g, '-')

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-')

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, '')

  // return
  return str
}

const vndFormatter = (num = 0) => {
  if (num < 0) return '0 ₫'
  return num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

const removeEmpty = (obj: any) => {
  for (const key in obj) {
    if (obj[key] == null) {
      delete obj[key]
    }
  }
}

function applySearch(
  query: SelectQueryBuilder<unknown>,
  q: string,
  tableName: string,
  searchKeys = ['name', 'description']
) {
  if (q) {
    let queryStr = ''
    searchKeys.forEach((key, idx) => {
      queryStr += `${tableName}.${key} LIKE :q `
      if (idx < searchKeys.length - 1) queryStr += 'OR '
    })
    query.andWhere(`(${queryStr})`, {
      q: `%${q}%`
    })
  }
}

function applyFilter(
  query: SelectQueryBuilder<unknown>,
  filter: string,
  tableName: string,
  searchKeys?: string[]
) {
  if (!isEmpty(filter)) {
    const filterObject = JSON.parse(filter)
    Object.entries(filterObject).forEach(
      ([property, value]: [string, string]) => {
        if (
          property !== 'q' &&
          property !== 'category_id' &&
          property !== 'comic_slug' &&
          property !== 'category_slug'
        ) {
          if (Array.isArray(value)) {
            query.where(`${tableName}.${property} IN (:...${property})`, {
              [property]: value
            })
          } else {
            query.where(`${tableName}.${property} = :${property}`, {
              [property]: value
            })
          }
        }
      }
    )
    const { q, category_id, comic_slug, category_slug } = filterObject
    if (category_id) {
      let ids = []
      if (Array.isArray(category_id)) ids = category_id
      else ids = [category_id]
      query.andWhere(`category.id IN (:...ids)`, { ids })
    }
    if (comic_slug) {
      query.andWhere(`comic.slug = :comic_slug`, { comic_slug })
    }
    if (category_slug) {
      query.andWhere(`category.slug = :category_slug`, { category_slug })
    }
    if (q) {
      applySearch(query, q, tableName, searchKeys)
    }
  }
}

function applyFilterComic(
  query: SelectQueryBuilder<unknown>,
  filter: string,
  tableName: string,
  searchKeys?: string[]
) {
  if (!isEmpty(filter)) {
    const filterObject = JSON.parse(filter)
    Object.entries(filterObject).forEach(
      ([property, value]: [string, string]) => {
        if (
          property !== 'q' &&
          property !== 'category_id' &&
          property !== 'category_slug' &&
          property !== 'child_category_slug'
        ) {
          if (Array.isArray(value)) {
            query.where(`${tableName}.${property} IN (:...${property})`, {
              [property]: value
            })
          } else {
            query.where(`${tableName}.${property} = :${property}`, {
              [property]: value
            })
          }
        }
      }
    )

    const { q, category_id, category_slug, child_category_slug } = filterObject

    if (category_id) {
      let ids = []
      if (Array.isArray(category_id)) ids = category_id
      else ids = [category_id]
      query.andWhere(`category.id IN (:...ids)`, { ids })
    }

    if (category_slug) {
      query.andWhere(`category.slug IN (:...categorySlug)`, {
        categorySlug: Array.isArray(category_slug)
          ? category_slug
          : [category_slug]
      })
    }

    if (child_category_slug) {
      query.andWhere(`childCategories.slug IN (:...childCategorySlug)`, {
        childCategorySlug: Array.isArray(child_category_slug)
          ? child_category_slug
          : [child_category_slug]
      })
    }

    if (q) {
      applySearch(query, q, tableName, searchKeys)
    }
  }
}

function applySort(
  query: SelectQueryBuilder<unknown>,
  sort: string | string[],
  tableName: string
) {
  if (!isEmpty(sort)) {
    if (typeof sort === 'string') {
      const [field, direction] = JSON.parse(sort)
      query.addOrderBy(`${tableName}.${field}`, direction)
    } else {
      sort.forEach((sortItem) => {
        const itemParse = JSON.parse(sortItem)
        const [field, direction] = itemParse
        query.addOrderBy(`${tableName}.${field}`, direction)
      })
    }
  }
}

function applyRange(
  query: SelectQueryBuilder<unknown>,
  range: string,
  tableName: string,
  fieldKey = 'price'
) {
  if (!isEmpty(range)) {
    const [from, to] = JSON.parse(range)
    if (from) {
      query.andWhere(`${tableName}.${fieldKey} >= :from`, { from })
    }
    if (to) {
      query.andWhere(`${tableName}.${fieldKey} <= :to`, { to })
    }
  }
}

export {
  toSlug,
  vndFormatter,
  removeEmpty,
  applySearch,
  applyFilter,
  applyFilterComic,
  applySort,
  applyRange
}
