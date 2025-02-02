import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
  });

  const handleAnonymousLogin = () => {
    onLogin({
      name: 'Anonymous User',
      age: 0,
      email: '',
      isAnonymous: true,
    });
  };

  const handlePersonalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: formData.name,
      age: parseInt(formData.age),
      email: formData.email,
      isAnonymous: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-8">Welcome to Mindful Youth</h2>
          
          {!isAnonymous ? (
            <form onSubmit={handlePersonalLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-purple focus:ring focus:ring-pastel-purple focus:ring-opacity-50"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-purple focus:ring focus:ring-pastel-purple focus:ring-opacity-50"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pastel-purple focus:ring focus:ring-pastel-purple focus:ring-opacity-50"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pastel-purple hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Sign In
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-2 text-sm text-red-700">
                    Emergency Mode - Get immediate assistance
                  </p>
                </div>
              </div>
              <button
                onClick={handleAnonymousLogin}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Continue Anonymously
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              {isAnonymous ? 'Switch to Personal Login' : 'Need Emergency Help?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}