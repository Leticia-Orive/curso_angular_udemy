export interface IPage<T> {
    content: T[]
    page: number
    size: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
    nextPage: number
    prevPage: number
}