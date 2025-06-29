import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit }) => (
  <div className="space-y-4">
    {todos.length === 0 ? (
      <div className="text-center text-secondary">No todos yet!</div>
    ) : (
      todos.map((todo) => <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />)
    )}
  </div>
);

export default TodoList;
