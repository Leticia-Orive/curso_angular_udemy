import { ICategory } from "./category.model"

export interface IPost {
    _id?: string
    title: string
    content: string
    categories: ICategory[],
    img: string
    publishedDate?: string
}