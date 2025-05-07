import React, { useState, useEffect } from 'react';
import { Todo, TodoService } from '../../services/TodoService';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'DONE' | 'CANCELED'>('ALL');

  // Fetch all todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await TodoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todo: Todo) => {
    try {
      const newTodo = await TodoService.createTodo(todo);
      setTodos(prev => [...prev, newTodo]);
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to add todo:', err);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    if (!todo.id) return;
    
    try {
      const updatedTodo = await TodoService.updateTodo(todo.id, todo);
      setTodos(prev => prev.map(t => t.id === todo.id ? updatedTodo : t));
      setEditingTodo(null);
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleStatusChange = async (todo: Todo, newStatus: 'DONE' | 'ACTIVE' | 'CANCELED') => {
    if (!todo.id) return;
    
    const updatedTodo = { ...todo, state: newStatus };
    try {
      await TodoService.updateTodo(todo.id, updatedTodo);
      setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, state: newStatus } : t));
    } catch (err) {
      console.error('Failed to update todo status:', err);
      setError('Failed to update todo status. Please try again.');
    }
  };

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') return true;
    return todo.state === filter;
  });

  // Count todos by status
  const countByStatus = {
    ALL: todos.length,
    ACTIVE: todos.filter(t => t.state === 'ACTIVE').length,
    DONE: todos.filter(t => t.state === 'DONE').length,
    CANCELED: todos.filter(t => t.state === 'CANCELED').length
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : '+ Add New Todo'}
        </button>
      </div>

      {showAddForm && (
        <TodoForm
          onSubmit={handleAddTodo}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingTodo && (
        <TodoForm
          todo={editingTodo}
          onSubmit={handleUpdateTodo}
          onCancel={() => setEditingTodo(null)}
        />
      )}

      <div className="mb-6 bg-white p-3 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2">
          {(['ALL', 'ACTIVE', 'DONE', 'CANCELED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status} ({countByStatus[status]})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading todos...</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No todos found</p>
          {filter !== 'ALL' && (
            <p className="text-gray-400 mt-1">Try changing the filter</p>
          )}
        </div>
      ) : (
        <div>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={() => setEditingTodo(todo)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;