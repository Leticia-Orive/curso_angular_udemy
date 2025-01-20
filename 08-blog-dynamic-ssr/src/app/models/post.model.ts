import { ICategory } from "./category.model";

export interface IPost {
    _id?:string;
    title: string;
    publishedData: Date;
    content: string;
    categories: ICategory[];
    img: string;
}