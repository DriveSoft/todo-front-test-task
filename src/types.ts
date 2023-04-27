export interface ITodo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    user_id: number;
}

export interface ITodoFilter {
    title: string;
    description: string;
    completed: boolean | undefined;
}