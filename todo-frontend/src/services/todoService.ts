export interface Todo {
    id?: number;
    description: string;
    creationDate?: string;
    expirationDate?: string;
    category: string;
    state: 'DONE' | 'ACTIVE' | 'CANCELED';
}

const API_BASE_URL = 'http://localhost:8080';

export const todoService = {
    async getAllTodos(): Promise<Todo[]> {
        const response = await fetch(`${API_BASE_URL}/todos`);
        return response.json();
    },

    async getTodo(id: number): Promise<Todo> {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`);
        return response.json();
    },

    async createTodo(todo: Todo): Promise<Todo> {
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        return response.json();
    },

    async updateTodo(id: number, todo: Todo): Promise<Todo> {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        return response.json();
    }
};