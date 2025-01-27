export interface IAction <T extends string> {
    name: T
    display: string
}

export interface IActionSelected<T, K extends string> {
    action: K | null
    items: T[]
}