import React from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const stateColors: Record<string, string> = {
  DONE: 'bg-green-700 text-green-200',
  ACTIVE: 'bg-blue-700 text-blue-200',
  CANCELED: 'bg-red-700 text-red-200',
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => (
  <div className="flex items-center justify-between p-4 rounded-lg shadow-md bg-card hover:bg-border transition border border-border">
    <div>
      <div className="font-bold text-lg text-foreground">{todo.description}</div>
      <div className="text-sm text-secondary">Category: {todo.category}</div>
      <div className="text-xs text-border">Created: {todo.creationDate} | Expires: {todo.expirationDate}</div>
    </div>
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${stateColors[todo.state]}`}>{todo.state}</span>
      <button
        className="ml-2 px-3 py-1 bg-accent hover:bg-primary text-white rounded transition"
        onClick={() => onEdit(todo)}
      >
        Edit
      </button>
    </div>
  </div>
);

export default TodoItem;
