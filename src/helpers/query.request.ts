export class QueryRequest {
  search?: string
  parentId?: number
  categories?: string[]
  type?: string
  filterType?: string
  priceFrom?: number
  priceTo?: number
  customerEmail?: string
}
