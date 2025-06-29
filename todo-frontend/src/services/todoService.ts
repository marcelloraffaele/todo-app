import { Todo } from '../types/Todo';

const API_URL = 'http://localhost:8080/todos';

export async function getAllTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function getTodoById(id: number): Promise<Todo> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch todo');
  return res.json();
}

export async function addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
}

export async function updateTodo(id: number, todo: Todo): Promise<Todo> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}
