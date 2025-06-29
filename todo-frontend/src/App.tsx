import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo } from './types/Todo';
import { getAllTodos, addTodo, updateTodo } from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editing, setEditing] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllTodos();
      setTodos(data);
    } catch (e) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (todo: Omit<Todo, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      await addTodo(todo);
      setShowForm(false);
      fetchTodos();
    } catch (e) {
      setError('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditing(todo);
    setShowForm(true);
  };

  const handleUpdate = async (todo: Omit<Todo, 'id'>) => {
    if (!editing) return;
    setLoading(true);
    setError(null);
    try {
      await updateTodo(editing.id, { ...editing, ...todo });
      setEditing(null);
      setShowForm(false);
      fetchTodos();
    } catch (e) {
      setError('Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-accent">Todo App</h1>
      <div className="card w-full max-w-2xl mx-auto">
        {error && <div className="mb-4 text-red-400">{error}</div>}
        {loading ? (
          <div className="text-secondary">Loading...</div>
        ) : (
          <TodoList todos={todos} onEdit={handleEdit} />
        )}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-primary text-white hover:bg-accent"
            onClick={() => setShowForm(true)}
          >
            Add Todo
          </button>
        </div>
        {showForm && (
          <div className="mt-6">
            <TodoForm
              onSubmit={editing ? handleUpdate : handleAdd}
              initial={editing || undefined}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
