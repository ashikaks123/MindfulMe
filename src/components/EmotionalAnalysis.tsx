import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Quote, EmotionalAnalysis as EmotionalAnalysisType } from '../types';
import { Sparkles } from 'lucide-react';

const questions = [
  "How happy do you feel today?",
  "How often did you feel sad today?",
  "How anxious did you feel today?",
  "How overwhelmed did you feel today?",
  "How well did you sleep last night?",
  "How connected do you feel to others?",
  "How satisfied are you with your daily activities?",
  "How much energy do you have today?",
  "How well can you concentrate today?",
  "How optimistic do you feel about tomorrow?"
];

const motivationalQuotes: Quote[] = [
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: "Unknown" },
  { text: "You are stronger than you know, braver than you believe.", author: "Christopher Robin" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Your mental health is a priority. Your happiness is essential.", author: "Unknown" },
  { text: "Small steps every day lead to big changes over time.", author: "Unknown" }
];

function getWeekNumber(date: string): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  return `Week ${weekNum}`;
}

export default function EmotionalAnalysis() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [history, setHistory] = useState<EmotionalAnalysisType[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote>(motivationalQuotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const weeklyData = useMemo(() => {
    const groupedByWeek: { [key: string]: EmotionalAnalysisType[] } = {};
    
    history.forEach(entry => {
      const weekKey = getWeekNumber(entry.date);
      if (!groupedByWeek[weekKey]) {
        groupedByWeek[weekKey] = [];
      }
      groupedByWeek[weekKey].push(entry);
    });

    return Object.entries(groupedByWeek).map(([week, entries]) => ({
      week,
      happiness: entries.reduce((sum, entry) => sum + entry.happiness, 0) / entries.length,
      sadness: entries.reduce((sum, entry) => sum + entry.sadness, 0) / entries.length,
      anxiety: entries.reduce((sum, entry) => sum + entry.anxiety, 0) / entries.length,
      overwhelm: entries.reduce((sum, entry) => sum + entry.overwhelm, 0) / entries.length,
    }));
  }, [history]);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const newEntry: EmotionalAnalysisType = {
        date: new Date().toISOString().split('T')[0],
        happiness: (newAnswers[0] + newAnswers[6]) / 2,
        sadness: newAnswers[1],
        anxiety: newAnswers[2],
        overwhelm: newAnswers[3]
      };
      setHistory([...history, newEntry]);
      setCurrentQuestion(0);
      setAnswers([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pastel-purple/20 to-pastel-blue/20 p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-pastel-purple" />
          <h3 className="text-lg font-medium">Daily Inspiration</h3>
        </div>
        <blockquote className="italic text-gray-700">"{currentQuote.text}"</blockquote>
        <p className="text-sm text-gray-600 mt-2">- {currentQuote.author}</p>
      </div>

      {answers.length < questions.length ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion]}</h3>
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => handleAnswer(score)}
                className="w-8 h-8 rounded-full bg-pastel-blue hover:bg-pastel-purple text-gray-700 hover:text-white transition-colors"
              >
                {score}
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>Not at all</span>
            <span>Very much</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAnswers([])}
          className="bg-pastel-purple text-white px-4 py-2 rounded-md"
        >
          Start New Assessment
        </button>
      )}

      {weeklyData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Weekly Emotional Trends</h3>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px] h-64">
              <LineChart
                width={600}
                height={200}
                data={weeklyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="happiness" 
                  stroke="#C1FFD7" 
                  strokeWidth={2}
                  name="Happiness"
                />
                <Line 
                  type="monotone" 
                  dataKey="sadness" 
                  stroke="#FFD6E0" 
                  strokeWidth={2}
                  name="Sadness"
                />
                <Line 
                  type="monotone" 
                  dataKey="anxiety" 
                  stroke="#C1E3FF" 
                  strokeWidth={2}
                  name="Anxiety"
                />
                <Line 
                  type="monotone" 
                  dataKey="overwhelm" 
                  stroke="#E5C1FF" 
                  strokeWidth={2}
                  name="Overwhelm"
                />
              </LineChart>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Weekly Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              {weeklyData.slice(-1)[0] && (
                <>
                  <div className="p-3 bg-pastel-green/20 rounded-lg">
                    <p className="text-sm font-medium">Average Happiness</p>
                    <p className="text-lg">{weeklyData.slice(-1)[0].happiness.toFixed(1)}/10</p>
                  </div>
                  <div className="p-3 bg-pastel-pink/20 rounded-lg">
                    <p className="text-sm font-medium">Average Sadness</p>
                    <p className="text-lg">{weeklyData.slice(-1)[0].sadness.toFixed(1)}/10</p>
                  </div>
                  <div className="p-3 bg-pastel-blue/20 rounded-lg">
                    <p className="text-sm font-medium">Average Anxiety</p>
                    <p className="text-lg">{weeklyData.slice(-1)[0].anxiety.toFixed(1)}/10</p>
                  </div>
                  <div className="p-3 bg-pastel-purple/20 rounded-lg">
                    <p className="text-sm font-medium">Average Overwhelm</p>
                    <p className="text-lg">{weeklyData.slice(-1)[0].overwhelm.toFixed(1)}/10</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}