import { useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { ThemeToggle } from './components/ThemeToggle';
import { Todo, todoService } from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todo: Todo) => {
    try {
      const newTodo = await todoService.createTodo(todo);
      setTodos(prev => [...prev, newTodo]);
      setError(null);
    } catch (err) {
      setError('Failed to create todo. Please try again.');
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    if (!todo.id) return;
    try {
      const updatedTodo = await todoService.updateTodo(todo.id, todo);
      setTodos(prev => prev.map(t => t.id === todo.id ? updatedTodo : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen app-gradient">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gradient mb-3">
            Todo Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Stay organized, get things done</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6 shadow-md animate-fadeIn">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <TodoForm onSubmit={handleAddTodo} />

        <div className="space-y-6 mt-8">
          {loading ? (
            <div className="text-center py-12 dark-card rounded-xl shadow-md">
              <div className="inline-block shimmer rounded-full h-12 w-12 border-4 border-indigo-300 border-t-indigo-500 animate-spin"></div>
              <p className="mt-4 font-medium">Loading your todos...</p>
            </div>
          ) : (
            <>
              {todos.length === 0 ? (
                <div className="text-center py-16 dark-card rounded-xl shadow-md">
                  <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">Your task list is empty</p>
                  <p className="text-gray-400 dark:text-gray-500">Add your first todo to get started!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {todos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onStateChange={handleUpdateTodo}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
