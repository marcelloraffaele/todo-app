import './App.css'
import TodoList from './components/Todo/TodoList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">Todo App</h1>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto mt-6 px-4">
        <TodoList />
      </main>
      
      <footer className="mt-12 py-6 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Todo App - Built with React, TypeScript & Tailwind CSS
        </div>
      </footer>
    </div>
  )
}

export default App
