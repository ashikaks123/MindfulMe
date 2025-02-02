import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="min-h-screen bg-pastel-background">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-pastel-purple" />
              <span className="ml-2 text-xl font-semibold text-gray-800">Mindful Youth</span>
            </div>
            {user && (
              <button
                onClick={() => setUser(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user ? (
          <Dashboard user={user} />
        ) : (
          <Login onLogin={setUser} />
        )}
      </main>
    </div>
  );
}

export default App;