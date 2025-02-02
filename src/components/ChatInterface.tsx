import React, { useState } from 'react';
import { Send, Phone } from 'lucide-react';

interface ChatInterfaceProps {
  isEmergency: boolean;
}

export default function ChatInterface({ isEmergency }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    {
      text: isEmergency 
        ? "Hello, I'm here to help you through this difficult time. How are you feeling right now?"
        : "Hi! How can I support you today?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I understand how you're feeling. Let's work through this together. Would you like to tell me more about what's on your mind?",
        sender: 'bot'
      }]);
    }, 1000);
  };

  return (
    <div className="h-[600px] flex flex-col">
      {isEmergency && (
        <div className="bg-red-50 p-4 mb-4 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-red-400" />
            <span className="ml-2 text-red-700">Emergency Helpline: 1-800-273-8255</span>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Call Now
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-pastel-purple text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-pastel-purple focus:ring focus:ring-pastel-purple focus:ring-opacity-50"
        />
        <button
          onClick={handleSend}
          className="bg-pastel-purple text-white p-2 rounded-md hover:bg-opacity-90"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}