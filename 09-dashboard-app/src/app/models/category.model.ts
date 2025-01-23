export interface ICategory{
    _id?: string
    name: string
    order?: number
    parent?: ICategory | string

}