import React, { useState, useEffect, useCallback } from 'react';

// Previous code remains, add BubbleGame component
function BubbleGame() {
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const createBubble = useCallback(() => {
    const newBubble = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 100),
      y: window.innerHeight,
      size: Math.random() * 30 + 20
    };
    setBubbles(prev => [...prev, newBubble]);
  }, []);

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + 1);
  };

  useEffect(() => {
    if (!gameStarted) return;

    const bubbleInterval = setInterval(createBubble, 1000);
    const animationInterval = setInterval(() => {
      setBubbles(prev => prev.map(bubble => ({
        ...bubble,
        y: bubble.y - 2
      })).filter(bubble => bubble.y + bubble.size > 0));
    }, 50);

    return () => {
      clearInterval(bubbleInterval);
      clearInterval(animationInterval);
    };
  }, [gameStarted, createBubble]);

  return (
    <div className="relative h-[500px] bg-gradient-to-b from-pastel-blue/20 to-pastel-purple/20 rounded-lg overflow-hidden">
      {!gameStarted ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setGameStarted(true)}
            className="bg-pastel-purple text-white px-6 py-3 rounded-lg text-lg hover:bg-opacity-90"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
            Score: {score}
          </div>
          {bubbles.map(bubble => (
            <button
              key={bubble.id}
              onClick={() => popBubble(bubble.id)}
              className="absolute rounded-full bg-gradient-to-br from-pastel-pink to-pastel-purple opacity-80 hover:opacity-100 transition-transform hover:scale-110 cursor-pointer"
              style={{
                left: `${bubble.x}px`,
                top: `${bubble.y}px`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default function Games() {
  const [activeGame, setActiveGame] = useState<'memory' | 'breathing' | 'bubbles' | null>(null);

  return (
    <div className="space-y-6">
      {!activeGame ? (
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setActiveGame('memory')}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium">Memory Game</h3>
            <p className="text-gray-600">Train your memory and focus</p>
          </button>
          <button
            onClick={() => setActiveGame('breathing')}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium">Breathing Exercise</h3>
            <p className="text-gray-600">Calm your mind with guided breathing</p>
          </button>
          <button
            onClick={() => setActiveGame('bubbles')}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium">Bubble Pop</h3>
            <p className="text-gray-600">Pop bubbles to relieve stress</p>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setActiveGame(null)}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Games
          </button>
          {activeGame === 'memory' ? <MemoryGame /> : 
           activeGame === 'breathing' ? <BreathingExercise /> : 
           <BubbleGame />}
        </div>
      )}
    </div>
  );
}