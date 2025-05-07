import React from 'react';
import { Todo } from '../../services/TodoService';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onStatusChange: (todo: Todo, newStatus: 'DONE' | 'ACTIVE' | 'CANCELED') => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onStatusChange }) => {
  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Get status badge color based on todo state
  const getStatusBadgeClasses = () => {
    switch (todo.state) {
      case 'DONE':
        return 'bg-green-100 text-green-800 border border-green-800';
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800 border border-blue-800';
      case 'CANCELED':
        return 'bg-red-100 text-red-800 border border-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{todo.description}</h3>
          
          <div className="text-sm text-gray-600 mb-2">
            <div>Created: {formatDate(todo.creationDate)}</div>
            {todo.expirationDate && (
              <div>Due: {formatDate(todo.expirationDate)}</div>
            )}
            {todo.category && (
              <div className="mt-1">
                <span className="inline-block bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md text-xs">
                  {todo.category}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses()}`}>
            {todo.state}
          </span>
          
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={() => onEdit(todo)}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-md text-sm transition-colors"
            >
              Edit
            </button>
            <div className="flex flex-col space-y-1">
              {todo.state !== 'DONE' && (
                <button 
                  onClick={() => onStatusChange(todo, 'DONE')}
                  className="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded-md text-xs transition-colors"
                >
                  Mark Done
                </button>
              )}
              {todo.state !== 'ACTIVE' && (
                <button 
                  onClick={() => onStatusChange(todo, 'ACTIVE')}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-md text-xs transition-colors"
                >
                  Reactivate
                </button>
              )}
              {todo.state !== 'CANCELED' && (
                <button 
                  onClick={() => onStatusChange(todo, 'CANCELED')}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded-md text-xs transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;