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
          devices: room.devices.map((device) => ({
            ...device,
            // Add default values for devices if they don't exist
            value: device.value || getDefaultValueForDevice(device),
          })),
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

  // New function to update device values
  const updateDeviceValue = (roomName, deviceId, value) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.name === roomName) {
          const newDevices = room.devices.map((device) => {
            if (device.id === deviceId) {
              return { ...device, value: value };
            }
            return device;
          });
          return {
            ...room,
            devices: newDevices,
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
        updateDeviceValue, // Add this new function
        loading,
        error,
        isDarkMode,
      }}
    >
      {children}
    </SmartHomeContext.Provider>
  );
}

// Helper function to get default values based on device type/name
function getDefaultValueForDevice(device) {
  const deviceType = device.type?.toLowerCase() || device.name.toLowerCase();

  if (deviceType.includes("light") || deviceType.includes("lamp")) {
    return 75; // 75% brightness
  }
  if (deviceType.includes("tv") || deviceType.includes("television")) {
    return 45; // 45% volume
  }
  if (deviceType.includes("fan")) {
    return 3; // Speed level 3
  }
  if (deviceType.includes("ac") || deviceType.includes("air")) {
    return 22; // 22°C
  }
  if (deviceType.includes("oven")) {
    return 180; // 180°C
  }
  if (deviceType.includes("fridge") || deviceType.includes("refrigerator")) {
    return 4; // 4°C
  }
  if (deviceType.includes("monitor") || deviceType.includes("screen")) {
    return 80; // 80% brightness
  }
  if (deviceType.includes("coffee")) {
    return 85; // 85°C
  }
  if (deviceType.includes("blind")) {
    return 50; // 50% open
  }

  return 50; // Default fallback
}

SmartHomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialRooms: PropTypes.array.isRequired,
};

export const useSmartHome = () => useContext(SmartHomeContext);
