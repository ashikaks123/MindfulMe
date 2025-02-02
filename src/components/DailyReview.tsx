import React, { useState } from 'react';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';

const dailyQuestions = [
  "What's one thing you're grateful for today?",
  "What's a small win you achieved today?",
  "What's something kind you did for yourself today?",
  "What's a positive thought you'd like to focus on?",
  "What's one thing you're looking forward to tomorrow?"
];

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function DailyReview() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion < dailyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('Daily review completed:', answers);
      setAnswers({});
      setCurrentQuestion(0);
    }
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-6">Daily Reflection</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {dailyQuestions[currentQuestion]}
            </label>
            <textarea
              value={answers[currentQuestion] || ''}
              onChange={(e) => setAnswers({...answers, [currentQuestion]: e.target.value})}
              className="w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-pastel-purple focus:ring focus:ring-pastel-purple focus:ring-opacity-50"
              placeholder="Write your thoughts here..."
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {dailyQuestions.length}
            </span>
            <button
              type="submit"
              className="bg-pastel-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              {currentQuestion === dailyQuestions.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Daily Tasks</h3>
        
        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-pastel-purple focus:ring focus:ring-pastel-purple focus:ring-opacity-50"
          />
          <button
            type="submit"
            className="bg-pastel-green p-2 rounded-md hover:bg-opacity-90"
          >
            <Plus className="h-5 w-5" />
          </button>
        </form>

        <div className="space-y-2">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-pastel-purple hover:text-opacity-80"
                >
                  {task.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                </button>
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}