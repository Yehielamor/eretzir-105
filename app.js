const { useState, useEffect } = React;

function App() {
    const [gameState, setGameState] = useState('lobby'); // lobby, playing, results
    const [players, setPlayers] = useState([]);
    const [currentLetter, setCurrentLetter] = useState('א');
    const [timer, setTimer] = useState(60);
    const [categories, setCategories] = useState(['ארץ', 'עיר', 'חיה', 'צמח', 'שם פרטי']);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        if (gameState === 'playing' && timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setGameState('results');
        }
    }, [gameState, timer]);

    const startGame = () => {
        setGameState('playing');
        setTimer(60);
        setCurrentLetter(MOCK_DATA.letters[Math.floor(Math.random() * MOCK_DATA.letters.length)]);
        setPlayers(MOCK_DATA.players);
        setAnswers({});
    };

    const handleAnswerChange = (category, value) => {
        setAnswers(prev => ({ ...prev, [category]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="text-center py-8">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">EretzIr</h1>
                <p className="text-xl mt-2 text-gray-300">משחק ארץ עיר בעברית - תחרותי ומהנה!</p>
            </header>
            {gameState === 'lobby' && (
                <div className="glass p-8 rounded-2xl shadow-2xl text-center">
                    <h2 className="text-3xl font-semibold mb-4">ברוכים הבאים!</h2>
                    <p className="text-gray-300 mb-6">הצטרפו לחדר משחק או צרו חדר חדש להתחלת תחרות.</p>
                    <button onClick={startGame} className="btn-primary">התחל משחק חדש</button>
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">שחקנים מקוונים</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {MOCK_DATA.players.map(player => (
                                <div key={player.id} className="glass p-4 rounded-xl text-center">
                                    <div className="text-2xl">{player.emoji}</div>
                                    <div className="font-medium">{player.name}</div>
                                    <div className="text-sm text-gray-400">{player.score} נקודות</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {gameState === 'playing' && (
                <div className="glass p-8 rounded-2xl shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-4xl font-bold text-blue-300">אות: {currentLetter}</div>
                        <div className="text-3xl font-bold text-red-400">זמן: {timer} שניות</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(category => (
                            <div key={category} className="glass p-6 rounded-xl">
                                <h3 className="text-2xl font-semibold mb-3">{category}</h3>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`הכנס ${category.toLowerCase()}...`}
                                    value={answers[category] || ''}
                                    onChange={(e) => handleAnswerChange(category, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <button onClick={() => setGameState('results')} className="btn-secondary">סיים משחק</button>
                    </div>
                </div>
            )}
            {gameState === 'results' && (
                <div className="glass p-8 rounded-2xl shadow-2xl">
                    <h2 className="text-3xl font-semibold mb-6 text-center">תוצאות המשחק</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-3">שם שחקן</th>
                                    <th className="py-3">ניקוד</th>
                                    <th className="py-3">תשובות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map(player => (
                                    <tr key={player.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                                        <td className="py-3">{player.emoji} {player.name}</td>
                                        <td className="py-3 font-bold">{player.score}</td>
                                        <td className="py-3">{Object.values(answers).join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 text-center">
                        <button onClick={() => setGameState('lobby')} className="btn-primary">חזור ללובי</button>
                    </div>
                </div>
            )}
            <footer className="text-center mt-12 text-gray-500 text-sm">
                <p>© 2026 EretzIr. כל הזכויות שמורות. משחק ארץ עיר בעברית.</p>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);