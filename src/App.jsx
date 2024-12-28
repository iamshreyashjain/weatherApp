import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const apiKey = "450b002d6ca74e4821caa3510db61084";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios
      .get(apiURL)
      .then((res) => {
        setData(res.data);
        setError("");
      })
      .catch((err) => {
        setError("City not found. Please try again.");
        setData({});
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        axios
          .get(apiURL)
          .then((res) => {
            setData(res.data);
            setError("");
          })
          .catch((err) => {
            setError("Unable to fetch weather for your location.");
          });
      });
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-5 text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-5">Weather App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {Object.keys(data).length > 0 && (
          <div className="text-center">
            <img
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="Weather Icon"
              className="w-24 mx-auto mb-4"
            />
            <h5 className="text-2xl font-semibold">{data?.name}</h5>
            <h6 className="text-xl font-medium">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
            <p className="text-sm mt-2">
              {data?.weather[0]?.description?.toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
