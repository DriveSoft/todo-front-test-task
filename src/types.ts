export interface ITodo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export interface ITodoFilter {
    title: string;
    description: string;
    completed: boolean | undefined;
}