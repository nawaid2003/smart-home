import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { SmartHomeProvider, useSmartHome } from "./context/SmartHomeContext";
import Dashboard from "./components/Dashboard";
import RoomsList from "./components/RoomsList";
import DevicesGrid from "./components/DevicesGrid";

// Mock data with more rooms
const initialRooms = [
  {
    name: "Living Room",
    devices: [
      {
        id: 1,
        name: "Smart Light",
        icon: "MdLightbulb",
        isOn: false,
        type: "light",
        value: 80,
        min: 0,
        max: 100,
        unit: "%",
      },
      {
        id: 2,
        name: "TV",
        icon: "MdTv",
        isOn: true,
        type: "tv",
        value: 20,
        min: 0,
        max: 100,
        unit: "%",
      },
      {
        id: 3,
        name: "Air Conditioner",
        icon: "MdAcUnit",
        isOn: true,
        type: "ac",
        value: 22,
        min: 16,
        max: 30,
        unit: "°C",
      },
    ],
  },
  {
    name: "Bedroom",
    devices: [
      {
        id: 4,
        name: "Bedside Lamp",
        icon: "MdLightbulb",
        isOn: true,
        type: "light",
        value: 50,
        min: 0,
        max: 100,
        unit: "%",
      },
      {
        id: 5,
        name: "Fan",
        icon: "MdAir",
        isOn: false,
        type: "fan",
        value: 3,
        min: 1,
        max: 5,
        unit: "Level",
      },
    ],
  },
  {
    name: "Kitchen",
    devices: [
      {
        id: 6,
        name: "Oven",
        icon: "MdKitchen",
        isOn: false,
        type: "oven",
        value: 180,
        min: 100,
        max: 250,
        unit: "°C",
      },
      {
        id: 7,
        name: "Fridge",
        icon: "MdKitchen",
        isOn: true,
        type: "fridge",
        value: 4,
        min: -5,
        max: 10,
        unit: "°C",
      },
    ],
  },
];

function AppContent() {
  const { weather, loading, error, unit, toggleUnit, isDarkMode } =
    useSmartHome();
  const [selectedRoom, setSelectedRoom] = useState(initialRooms[0].name);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    console.log("App mounted, isDarkMode:", isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);

    // Set greeting based on current time
    const now = new Date();
    const hour = now.getHours();

    let greet = "";
    if (hour >= 5 && hour < 12) {
      greet = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      greet = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      greet = "Good Evening";
    } else {
      greet = "Good Night";
    }
    setGreeting(greet);
  }, [isDarkMode]);

  const energyUsage = useMemo(() => {
    const totalActive = initialRooms.reduce(
      (acc, room) => acc + room.devices.filter((d) => d.isOn).length,
      0
    );
    return `${
      totalActive * 50
    } kWh (Tip: Turn off unused devices to save energy!)`;
  }, []);

  if (error) {
    console.error("App Error:", error);
    return (
      <div className="text-center p-4 text-red-400">
        Error: {error}. Check console for details.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-white flex flex-col max-w-md mx-auto shadow-2xl rounded-3xl overflow-hidden">
      <Dashboard
        greeting={greeting}
        temperature={weather?.temp}
        condition={weather?.condition}
        energyUsage={energyUsage}
        unit={unit}
        toggleUnit={toggleUnit}
        loading={loading}
        error={error}
      />
      <RoomsList
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRoom}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mt-6"
        >
          <DevicesGrid roomName={selectedRoom} />
        </motion.div>
      </AnimatePresence>
      <footer className="mt-auto p-4 text-center text-sm opacity-70">
        Fun Fact: The fear of long words is called
        Hippopotomonstrosesquippedaliophobia.
      </footer>
    </div>
  );
}

AppContent.propTypes = {};

function App() {
  return (
    <SmartHomeProvider initialRooms={initialRooms}>
      <AppContent />
    </SmartHomeProvider>
  );
}

export default App;
