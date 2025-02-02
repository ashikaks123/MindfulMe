import React, { useState } from 'react';
import { User } from '../types';
import EmotionalAnalysis from './EmotionalAnalysis';
import ChatInterface from './ChatInterface';
import DailyReview from './DailyReview';
import Games from './Games';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('emotional');

  const tabs = [
    { id: 'emotional', name: 'Emotional Analysis' },
    { id: 'chat', name: 'Chat Support' },
    { id: 'review', name: 'Daily Review' },
    { id: 'games', name: 'Stress Relief Games' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-xl font-semibold">
          Welcome, {user.isAnonymous ? 'Anonymous User' : user.name}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-4 px-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-pastel-purple text-pastel-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          {activeTab === 'emotional' && <EmotionalAnalysis />}
          {activeTab === 'chat' && <ChatInterface isEmergency={user.isAnonymous} />}
          {activeTab === 'review' && <DailyReview />}
          {activeTab === 'games' && <Games />}
        </div>
      </div>
    </div>
  );
}