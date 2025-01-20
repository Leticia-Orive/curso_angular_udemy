export interface ICategory {
    _id?: string;
    name: string;
    parent: string | ICategory | null;
    children?: ICategory[];

}