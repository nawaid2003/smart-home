import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const SmartHomeContext = createContext();

export function SmartHomeProvider({ children, initialRooms }) {
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem("rooms");
    return saved
      ? JSON.parse(saved)
      : initialRooms.map((room) => ({
          ...room,
          activeCount: room.devices.filter((d) => d.isOn).length,
        }));
  });
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "C");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hour = new Date().getHours();
  const isDarkMode = hour >= 18 || hour < 6;

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
    console.log("Rooms state updated:", rooms);
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("unit", unit);
    console.log("Unit updated:", unit);
  }, [unit]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        if (!apiKey) {
          throw new Error("Weather API key is missing in .env");
        }
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=28.7041,77.1025`; // Delhi coordinates
        console.log("Fetching weather from:", url);
        const res = await axios.get(url);
        const data = res.data.current;
        setWeather({
          temp: unit === "C" ? data.temp_c : data.temp_f,
          condition: res.data.current.condition.text,
        });
        console.log("Weather fetched:", {
          temp: weather?.temp,
          condition: weather?.condition,
        });
      } catch (err) {
        console.error("Weather fetch error:", err.message);
        setError(`Weather fetch failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [unit]);

  const toggleDevice = (roomName, deviceId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.name === roomName) {
          const newDevices = room.devices.map((device) => {
            if (device.id === deviceId) {
              return { ...device, isOn: !device.isOn };
            }
            return device;
          });
          return {
            ...room,
            devices: newDevices,
            activeCount: newDevices.filter((d) => d.isOn).length,
          };
        }
        return room;
      })
    );
  };

  const toggleUnit = () => setUnit((prev) => (prev === "C" ? "F" : "C"));

  return (
    <SmartHomeContext.Provider
      value={{
        rooms,
        weather,
        unit,
        toggleUnit,
        toggleDevice,
        loading,
        error,
        isDarkMode,
      }}
    >
      {children}
    </SmartHomeContext.Provider>
  );
}

SmartHomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialRooms: PropTypes.array.isRequired,
};

export const useSmartHome = () => useContext(SmartHomeContext);
