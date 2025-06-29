import React, { useState, useEffect } from 'react';
import { Todo, TodoState } from '../types/Todo';

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  initial?: Todo | null;
  onCancel?: () => void;
}

const defaultForm = {
  description: '',
  creationDate: '',
  expirationDate: '',
  category: '',
  state: 'ACTIVE' as TodoState,
};

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initial, onCancel }) => {
  const [form, setForm] = useState<Omit<Todo, 'id'>>(defaultForm);

  useEffect(() => {
    if (initial) {
      const { id, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(defaultForm);
    }
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow-lg border border-border">
      <div>
        <label className="block text-foreground mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-input text-foreground border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-foreground mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-input text-foreground border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-foreground mb-1">State</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full bg-input text-foreground border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ACTIVE">Active</option>
            <option value="DONE">Done</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-foreground mb-1">Creation Date</label>
          <input
            type="date"
            name="creationDate"
            value={form.creationDate}
            onChange={handleChange}
            className="w-full bg-input text-foreground border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-foreground mb-1">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
            className="w-full bg-input text-foreground border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-secondary text-white hover:bg-border">
            Cancel
          </button>
        )}
        <button type="submit" className="bg-primary text-white hover:bg-accent">
          {initial ? 'Update' : 'Add'} Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
