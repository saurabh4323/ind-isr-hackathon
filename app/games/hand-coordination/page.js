'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Target, 
  Timer, 
  Trophy,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function HandCoordinationGame() {
  const { user } = useAuth();
  const router = useRouter();
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  
  const [gameState, setGameState] = useState('ready'); // ready, playing, paused, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  const [targets, setTargets] = useState([]);
  const [missed, setMissed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [gameStats, setGameStats] = useState({
    totalShots: 0,
    hits: 0,
    startTime: null,
    endTime: null
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    initGame();
    return () => {
      if (gameRef.current) {
        clearInterval(gameRef.current);
      }
    };
  }, [user, router]);

  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    
    // Set initial targets
    generateTargets();
  };

  const generateTargets = () => {
    const newTargets = [];
    const targetCount = Math.min(3 + level, 8);
    
    for (let i = 0; i < targetCount; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * 700 + 50,
        y: Math.random() * 500 + 50,
        radius: 20 + Math.random() * 15,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        active: true,
        points: Math.floor(Math.random() * 3) + 1
      });
    }
    
    setTargets(newTargets);
  };

  const startGame = () => {
    setGameState('playing');
    setGameStats(prev => ({ ...prev, startTime: new Date() }));
    
    gameRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseGame = () => {
    setGameState('paused');
    if (gameRef.current) {
      clearInterval(gameRef.current);
    }
  };

  const resumeGame = () => {
    setGameState('playing');
    gameRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setGameState('finished');
    if (gameRef.current) {
      clearInterval(gameRef.current);
    }
    
    const endTime = new Date();
    setGameStats(prev => ({ ...prev, endTime }));
    
    // Calculate final accuracy
    const finalAccuracy = gameStats.totalShots > 0 
      ? Math.round((gameStats.hits / gameStats.totalShots) * 100)
      : 100;
    setAccuracy(finalAccuracy);
    
    // Save game session
    saveGameSession();
  };

  const resetGame = () => {
    setGameState('ready');
    setScore(0);
    setTimeLeft(60);
    setLevel(1);
    setMissed(0);
    setAccuracy(100);
    setGameStats({
      totalShots: 0,
      hits: 0,
      startTime: null,
      endTime: null
    });
    generateTargets();
  };

  const handleCanvasClick = (e) => {
    if (gameState !== 'playing') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setGameStats(prev => ({ ...prev, totalShots: prev.totalShots + 1 }));
    
    // Check if click hit any target
    let hit = false;
    const newTargets = targets.map(target => {
      if (!target.active) return target;
      
      const distance = Math.sqrt((x - target.x) ** 2 + (y - target.y) ** 2);
      if (distance <= target.radius) {
        hit = true;
        setScore(prev => prev + target.points * 10);
        setGameStats(prev => ({ ...prev, hits: prev.hits + 1 }));
        return { ...target, active: false };
      }
      return target;
    });
    
    if (!hit) {
      setMissed(prev => prev + 1);
    }
    
    setTargets(newTargets);
    
    // Check if all targets are hit
    if (newTargets.every(target => !target.active)) {
      setLevel(prev => prev + 1);
      generateTargets();
    }
  };

  const saveGameSession = async () => {
    try {
      const token = localStorage.getItem('token');
      const sessionData = {
        gameType: 'hand-coordination',
        sessionData: {
          duration: 60 - timeLeft,
          score: score,
          accuracy: accuracy,
          difficulty: level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard',
          movements: []
        },
        performance: {
          startTime: gameStats.startTime,
          endTime: gameStats.endTime,
          energyLevel: 8,
          painLevel: 2
        },
        feedback: {
          enjoyment: 4,
          difficulty: Math.min(Math.ceil(level / 2), 5),
          comments: ''
        }
      };
      
      await fetch('/api/games/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sessionData)
      });
    } catch (error) {
      console.error('Failed to save game session:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hand Coordination Training
          </h1>
          <p className="text-lg text-gray-600">
            Click on the colored targets to improve your hand-eye coordination
          </p>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          {gameState === 'ready' && (
            <button
              onClick={startGame}
              className="btn-primary flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Game</span>
            </button>
          )}
          
          {gameState === 'playing' && (
            <>
              <button
                onClick={pauseGame}
                className="btn-secondary flex items-center space-x-2"
              >
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </button>
              <button
                onClick={endGame}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                End Game
              </button>
            </>
          )}
          
          {gameState === 'paused' && (
            <button
              onClick={resumeGame}
              className="btn-primary flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Resume</span>
            </button>
          )}
          
          {(gameState === 'paused' || gameState === 'finished') && (
            <button
              onClick={resetGame}
              className="btn-secondary flex items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Restart</span>
            </button>
          )}
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{formatTime(timeLeft)}</div>
            <div className="text-sm text-gray-600">Time Left</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">{level}</div>
            <div className="text-sm text-gray-600">Level</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">{accuracy}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-red-600">{missed}</div>
            <div className="text-sm text-gray-600">Missed</div>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="border-4 border-gray-300 rounded-lg cursor-crosshair bg-white shadow-lg"
              style={{ width: '800px', height: '600px' }}
            />
            
            {/* Game Overlay */}
            {gameState === 'ready' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Target className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Ready to Start?</h2>
                  <p className="text-lg">Click the targets as they appear!</p>
                </div>
              </div>
            )}
            
            {gameState === 'paused' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Pause className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Game Paused</h2>
                  <p className="text-lg">Click Resume to continue</p>
                </div>
              </div>
            )}
            
            {gameState === 'finished' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                  <h2 className="text-2xl font-bold mb-2">Game Complete!</h2>
                  <p className="text-lg mb-4">Final Score: {score}</p>
                  <p className="text-lg mb-4">Accuracy: {accuracy}%</p>
                  <p className="text-lg mb-4">Level Reached: {level}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game Instructions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Play</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Objective</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Click on the colored targets as they appear</li>
                <li>• Each target is worth different points</li>
                <li>• Complete levels to progress</li>
                <li>• Aim for high accuracy and score</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Focus on precision over speed initially</li>
                <li>• Take breaks if you feel fatigued</li>
                <li>• Practice regularly for best results</li>
                <li>• Track your progress over time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
