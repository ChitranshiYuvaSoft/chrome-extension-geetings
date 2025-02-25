import { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = time.getHours();
    if (hour < 12) setGreeting('Good Morning, Chitranshi ☀️');
    else if (hour < 18) setGreeting('Good Afternoon, Chitranshi 🌤️');
    else setGreeting('Good Evening, Chitranshi 🌙');
  }, [time]);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <h1 className="text-5xl font-bold">{greeting}</h1>
      <p className="text-3xl mt-4">{formatTime(time)}</p>
      <input
        type="text"
        placeholder="Search Google..."
        className="mt-6 p-3 w-1/2 text-black rounded-lg"
        onKeyDown={(e) => {
          if (e.key === 'Enter') window.open(`https://www.google.com/search?q=${e.target.value}`, '_blank');
        }}
      />
    </div>
  );
};

export default App;
