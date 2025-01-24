

export interface IColumn {
    display: string
    property: string
    canSort?: boolean
    //Haremos un tipo propio para sort mas adelante
    sort?: string
}