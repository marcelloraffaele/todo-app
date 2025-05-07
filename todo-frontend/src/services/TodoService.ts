import axios from 'axios';

// Define the Todo interface matching the backend model
export interface Todo {
  id?: number;
  description: string;
  creationDate: string;
  expirationDate?: string;
  category?: string;
  state: 'DONE' | 'ACTIVE' | 'CANCELED';
}

const API_URL = 'http://localhost:8080';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const TodoService = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  },

  // Get todo by id
  getTodoById: async (id: number): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todo: Todo): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', todo);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: number, todo: Todo): Promise<Todo> => {
    const response = await api.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  }
};