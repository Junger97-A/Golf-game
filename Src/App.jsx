import React, { useState } from 'react';
import { Plus, Trash2, Home, Trophy } from 'lucide-react';

export default function GolfPartyGame() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [points, setPoints] = useState({});
  const [currentPhase, setCurrentPhase] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameData, setGameData] = useState({});

  const phases = {
    before: {
      name: '🥞 Before Golf',
      games: ['Breakfast Trivia', 'Guess the Song', 'Dice Toss Challenge', 'Horse Race Betting']
    },
    during: {
      name: '⛳ During Golf',
      games: ['Longest Drive', 'Longest Putt', 'Most Beers (Hole 15)']
    },
    after: {
      name: '🍻 After Golf',
      games: ['Craziest Story', 'Beer Hold Challenge', 'Mystery Game']
    }
  };

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = newPlayerName.trim();
      setPlayers([...players, newPlayer]);
      setPoints({ ...points, [newPlayer]: 0 });
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerName) => {
    setPlayers(players.filter(p => p !== playerName));
    const newPoints = { ...points };
    delete newPoints[playerName];
    setPoints(newPoints);
  };

  const addPoints = (playerName, amount) => {
    setPoints({ ...points, [playerName]: (points[playerName] || 0) + amount });
  };

  const resetPoints = () => {
    const newPoints = {};
    players.forEach(p => newPoints[p] = 0);
    setPoints(newPoints);
  };

  const goHome = () => {
    setCurrentPhase(null);
    setCurrentGame(null);
  };

  const startGame = (phase, game) => {
    setCurrentPhase(phase);
    setCurrentGame(game);
    setGameData({});
  };

  // Sort players by points
  const sortedPlayers = [...players].sort((a, b) => (points[b] || 0) - (points[a] || 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">⛳ GOLF PARTY GAMES ⛳</h1>
          <p className="text-green-100">Let's make this day unforgettable!</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {!currentGame ? (
          <>
            {/* Player Management */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">👥 Players</h2>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                    placeholder="Player name"
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={addPlayer}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                  >
                    <Plus size={20} /> Add
                  </button>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sortedPlayers.map((player) => (
                    <div key={player} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{player}</p>
                        <p className="text-2xl font-bold text-green-600">{points[player] || 0}</p>
                      </div>
                      <button
                        onClick={() => removePlayer(player)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
                {players.length > 0 && (
                  <button
                    onClick={resetPoints}
                    className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                  >
                    Reset Points
                  </button>
                )}
              
