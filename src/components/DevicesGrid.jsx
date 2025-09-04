import { useSmartHome } from "../context/SmartHomeContext";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  MdLightbulb,
  MdTv,
  MdAcUnit,
  MdAir,
  MdKitchen,
  MdBlinds,
  MdCoffeeMaker,
  MdWaterDrop,
  MdMonitor,
  MdClose,
  MdVolumeUp,
  MdBrightness6,
  MdThermostat,
  MdSpeed,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const deviceIcons = {
  MdLightbulb: MdLightbulb,
  MdTv: MdTv,
  MdAcUnit: MdAcUnit,
  MdAir: MdAir,
  MdKitchen: MdKitchen,
  MdBlinds: MdBlinds,
  MdCoffeeMaker: MdCoffeeMaker,
  MdWaterDrop: MdWaterDrop,
  MdMonitor: MdMonitor,
};

// Device type configurations
const deviceConfigs = {
  light: {
    property: "brightness",
    min: 0,
    max: 100,
    unit: "%",
    icon: MdBrightness6,
    color: "from-yellow-400 to-orange-500",
    defaultValue: 75,
  },
  lamp: {
    property: "brightness",
    min: 0,
    max: 100,
    unit: "%",
    icon: MdBrightness6,
    color: "from-yellow-400 to-orange-500",
    defaultValue: 60,
  },
  tv: {
    property: "volume",
    min: 0,
    max: 100,
    unit: "%",
    icon: MdVolumeUp,
    color: "from-blue-400 to-purple-500",
    defaultValue: 45,
  },
  fan: {
    property: "speed",
    min: 1,
    max: 5,
    unit: "",
    icon: MdSpeed,
    color: "from-cyan-400 to-blue-500",
    defaultValue: 3,
  },
  ac: {
    property: "temperature",
    min: 16,
    max: 30,
    unit: "°C",
    icon: MdThermostat,
    color: "from-blue-500 to-cyan-400",
    defaultValue: 22,
  },
  oven: {
    property: "temperature",
    min: 100,
    max: 250,
    unit: "°C",
    icon: MdThermostat,
    color: "from-red-400 to-orange-500",
    defaultValue: 180,
  },
  fridge: {
    property: "temperature",
    min: -5,
    max: 10,
    unit: "°C",
    icon: MdThermostat,
    color: "from-blue-600 to-cyan-500",
    defaultValue: 4,
  },
  monitor: {
    property: "brightness",
    min: 0,
    max: 100,
    unit: "%",
    icon: MdBrightness6,
    color: "from-gray-400 to-blue-500",
    defaultValue: 80,
  },
  coffee: {
    property: "temperature",
    min: 60,
    max: 95,
    unit: "°C",
    icon: MdThermostat,
    color: "from-amber-600 to-yellow-500",
    defaultValue: 85,
  },
  blinds: {
    property: "position",
    min: 0,
    max: 100,
    unit: "%",
    icon: MdBlinds,
    color: "from-gray-500 to-slate-600",
    defaultValue: 50,
  },
};

// Helper function to get device config
function getDeviceConfig(device) {
  const deviceType = device.type?.toLowerCase() || device.name.toLowerCase();

  if (deviceType.includes("light") || deviceType.includes("lamp")) {
    return deviceConfigs.light;
  }
  if (deviceType.includes("tv") || deviceType.includes("television")) {
    return deviceConfigs.tv;
  }
  if (deviceType.includes("fan")) {
    return deviceConfigs.fan;
  }
  if (deviceType.includes("ac") || deviceType.includes("air")) {
    return deviceConfigs.ac;
  }
  if (deviceType.includes("oven")) {
    return deviceConfigs.oven;
  }
  if (deviceType.includes("fridge") || deviceType.includes("refrigerator")) {
    return deviceConfigs.fridge;
  }
  if (deviceType.includes("monitor") || deviceType.includes("screen")) {
    return deviceConfigs.monitor;
  }
  if (deviceType.includes("coffee")) {
    return deviceConfigs.coffee;
  }
  if (deviceType.includes("blind")) {
    return deviceConfigs.blinds;
  }

  // Default fallback
  return deviceConfigs.light;
}

// Helper function to generate preset values based on device type
function getPresetValues(device) {
  const config = getDeviceConfig(device);
  const { min, max, property } = config;

  if (property === "brightness") {
    return [
      { label: "Low", value: Math.ceil(max * 0.3) },
      { label: "Med", value: Math.ceil(max * 0.6) },
      { label: "High", value: max },
    ];
  }

  if (property === "volume") {
    return [
      { label: "Low", value: Math.ceil(max * 0.3) },
      { label: "Med", value: Math.ceil(max * 0.6) },
      { label: "High", value: Math.ceil(max * 0.8) },
    ];
  }

  if (property === "speed") {
    return [
      { label: "Low", value: 1 },
      { label: "Med", value: 3 },
      { label: "High", value: 5 },
    ];
  }

  if (property === "temperature") {
    if (min < 0) {
      // Fridge
      return [
        { label: "Cold", value: -2 },
        { label: "Med", value: 2 },
        { label: "Warm", value: 6 },
      ];
    } else if (max > 100) {
      // Oven
      return [
        { label: "Low", value: 120 },
        { label: "Med", value: 180 },
        { label: "High", value: 220 },
      ];
    } else {
      // AC or Coffee
      const mid = Math.ceil((min + max) / 2);
      return [
        { label: "Cool", value: min + 2 },
        { label: "Med", value: mid },
        { label: "Warm", value: max - 2 },
      ];
    }
  }

  // Default presets
  return [
    { label: "Low", value: Math.ceil(min + (max - min) * 0.3) },
    { label: "Med", value: Math.ceil(min + (max - min) * 0.6) },
    { label: "High", value: Math.ceil(min + (max - min) * 0.9) },
  ];
}

function DevicesGrid({ roomName }) {
  const { rooms, toggleDevice, updateDeviceValue } = useSmartHome();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const room = rooms.find((r) => r.name === roomName);

  if (!room) return <div className="text-center p-4">Room not found</div>;

  const handleDeviceClick = (device) => {
    console.log("Device clicked:", device);
    if (device.isOn) {
      setSelectedDevice(device);
      console.log("Selected device set:", device);
    }
  };

  const closeModal = () => {
    setSelectedDevice(null);
  };

  const handleValueChange = (value) => {
    if (selectedDevice) {
      updateDeviceValue(roomName, selectedDevice.id, parseInt(value));

      setSelectedDevice((prev) => ({
        ...prev,
        value: parseInt(value),
      }));
    }
  };

  const getDeviceValue = (device) => {
    const config = getDeviceConfig(device);
    return device.value !== undefined ? device.value : config.defaultValue;
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {room.devices.map((device, index) => {
          const Icon = deviceIcons[device.icon];
          const config = getDeviceConfig(device);
          const deviceValue = getDeviceValue(device);

          return (
            <motion.div
              key={device.id}
              className={`bg-card-bg p-4 rounded-2xl shadow-md flex flex-col items-center backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:shadow-xl hover:scale-105 cursor-pointer ${
                device.isOn ? "ring-2 ring-secondary/30" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              onClick={() => handleDeviceClick(device)}
            >
              <Icon
                className={`text-4xl mb-2 ${
                  device.isOn ? "text-secondary" : "text-red-400"
                }`}
              />
              <p className="font-semibold text-center text-sm mb-2">
                {device.name}
              </p>

              {device.isOn && (
                <div className="text-xs text-center opacity-80 mb-2">
                  <span className="font-medium">
                    {config.property}: {deviceValue}
                    {config.unit}
                  </span>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDevice(roomName, device.id);
                }}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                  device.isOn ? "bg-secondary" : "bg-gray-500"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                    device.isOn ? "translate-x-6" : "translate-x-0"
                  }`}
                />
                <span className="sr-only">{device.name}</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Control Modal */}
      <AnimatePresence>
        {selectedDevice && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  getDeviceConfig(selectedDevice).color
                } opacity-10`}
              />

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <MdClose className="text-xl" />
              </button>

              {/* Device Info */}
              <div className="text-center mb-6 relative z-10">
                {(() => {
                  const DeviceIcon = deviceIcons[selectedDevice.icon];
                  return (
                    <DeviceIcon className="text-6xl mx-auto mb-3 text-secondary" />
                  );
                })()}
                <h3 className="text-2xl font-bold mb-2">
                  {selectedDevice.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 capitalize">
                  {getDeviceConfig(selectedDevice).property} Control
                </p>
              </div>

              {/* Control Interface */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {(() => {
                    const ControlIcon = getDeviceConfig(selectedDevice).icon;
                    return <ControlIcon className="text-2xl text-secondary" />;
                  })()}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-secondary">
                      {getDeviceValue(selectedDevice)}
                      {getDeviceConfig(selectedDevice).unit}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {getDeviceConfig(selectedDevice).property}
                    </div>
                  </div>
                </div>

                {/* Interactive Slider */}
                <div className="mb-6">
                  <input
                    type="range"
                    min={getDeviceConfig(selectedDevice).min}
                    max={getDeviceConfig(selectedDevice).max}
                    value={getDeviceValue(selectedDevice)}
                    onChange={(e) => handleValueChange(e.target.value)}
                    className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, 
                        #10b981 0%, 
                        #10b981 ${
                          ((getDeviceValue(selectedDevice) -
                            getDeviceConfig(selectedDevice).min) /
                            (getDeviceConfig(selectedDevice).max -
                              getDeviceConfig(selectedDevice).min)) *
                          100
                        }%, 
                        #e5e7eb ${
                          ((getDeviceValue(selectedDevice) -
                            getDeviceConfig(selectedDevice).min) /
                            (getDeviceConfig(selectedDevice).max -
                              getDeviceConfig(selectedDevice).min)) *
                          100
                        }%, 
                        #e5e7eb 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>
                      {getDeviceConfig(selectedDevice).min}
                      {getDeviceConfig(selectedDevice).unit}
                    </span>
                    <span>
                      {getDeviceConfig(selectedDevice).max}
                      {getDeviceConfig(selectedDevice).unit}
                    </span>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {getPresetValues(selectedDevice).map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handleValueChange(preset.value)}
                      className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                        getDeviceValue(selectedDevice) === preset.value
                          ? "bg-secondary text-white shadow-lg scale-105"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
}

DevicesGrid.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default DevicesGrid;
