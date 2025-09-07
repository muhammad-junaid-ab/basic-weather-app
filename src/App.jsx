import { useState } from "react";
import axios from "axios";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "31a7023542491a087f245a95b0ce50ee";

  const getWeather = async () => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found ❌");
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 p-4">
      <h1 className="text-3xl font-bold mb-6">Weather App</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded-lg text-black outline-none border-2 bg-white"
        />
        <button
          onClick={getWeather}
          className="bg-yellow-400 text-black border-2 px-4 py-2 rounded-lg font-bold cursor-pointer hover:bg-yellow-300">
          Search
        </button>
      </div>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {weather && (
        <div className="mt-6 bg-white/20 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-xl">{weather.main.temp}°C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
