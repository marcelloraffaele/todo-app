import { useState } from 'react';
import { Todo } from '../services/todoService';

interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
}

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!description.trim() || !category.trim()) return;
        
        setIsSubmitting(true);
        
        try {
            await onSubmit({
                description,
                category,
                expirationDate: expirationDate ? new Date(expirationDate).toISOString() : undefined,
                state: 'ACTIVE',
            });

            setDescription('');
            setCategory('');
            setExpirationDate('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 dark-card rounded-xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl border-t-4 border-indigo-500">
            <div className="space-y-4">
                <div className="relative">
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                        What needs to be done?
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                        placeholder="Enter your todo description"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            required
                            placeholder="e.g., Work, Personal, Shopping"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="expirationDate" className="block text-sm font-medium mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="expirationDate"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            min={new Date().toISOString().split('T')[0]}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full btn-gradient text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Adding...
                        </span>
                    ) : (
                        'Add Todo'
                    )}
                </button>
            </div>
        </form>
    );
};