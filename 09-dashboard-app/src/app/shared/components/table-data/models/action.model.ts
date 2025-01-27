export interface IAction{
    name: string
    display: string
}

export interface IActionSelected<T> {
    action: string | null
    items: T[]
}