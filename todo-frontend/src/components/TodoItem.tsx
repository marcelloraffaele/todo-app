import { Todo } from '../services/todoService';

interface TodoItemProps {
    todo: Todo;
    onStateChange: (todo: Todo) => void;
}

const stateColors = {
    DONE: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-300 dark:border-green-700',
        text: 'text-green-700 dark:text-green-400',
        icon: 'text-green-500 dark:text-green-400',
        shadow: 'shadow-green-100 dark:shadow-green-900/10'
    },
    ACTIVE: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-300 dark:border-blue-700',
        text: 'text-blue-700 dark:text-blue-400',
        icon: 'text-blue-500 dark:text-blue-400',
        shadow: 'shadow-blue-100 dark:shadow-blue-900/10'
    },
    CANCELED: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-300 dark:border-red-700',
        text: 'text-red-700 dark:text-red-400',
        icon: 'text-red-500 dark:text-red-400',
        shadow: 'shadow-red-100 dark:shadow-red-900/10'
    }
};

const stateIcons = {
    DONE: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ),
    ACTIVE: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
    ),
    CANCELED: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
    )
};

export const TodoItem = ({ todo, onStateChange }: TodoItemProps) => {
    const handleStateChange = () => {
        const newState = todo.state === 'ACTIVE' ? 'DONE' : 
                        todo.state === 'DONE' ? 'CANCELED' : 'ACTIVE';
        onStateChange({ ...todo, state: newState });
    };

    const stateStyle = stateColors[todo.state];
    
    return (
        <div
            className={`p-5 rounded-xl ${stateStyle.bg} ${stateStyle.border} border todo-card cursor-pointer shadow-md`}
            onClick={handleStateChange}
        >
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${stateStyle.text}`}>
                        <span className={`inline-block p-1 rounded-full ${stateStyle.bg} ${stateStyle.icon}`}>
                            {stateIcons[todo.state]}
                        </span>
                        {todo.description}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                            {todo.category}
                        </span>
                        {todo.creationDate && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Created: {new Date(todo.creationDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${stateStyle.text} bg-white dark:bg-gray-800 shadow-sm border ${stateStyle.border}`}>
                        {todo.state}
                    </span>
                    {todo.expirationDate && (
                        <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Due: {new Date(todo.expirationDate).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};