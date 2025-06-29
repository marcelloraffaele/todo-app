export type TodoState = 'DONE' | 'ACTIVE' | 'CANCELED';

export interface Todo {
  id: number;
  description: string;
  creationDate: string;
  expirationDate: string;
  category: string;
  state: TodoState;
}
