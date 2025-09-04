import { useSmartHome } from "../context/SmartHomeContext";
import PropTypes from "prop-types";
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
} from "react-icons/md";
import { motion } from "framer-motion";

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

function DevicesGrid({ roomName }) {
  const { rooms, toggleDevice, updateDeviceValue } = useSmartHome();
  const room = rooms.find((r) => r.name === roomName);

  if (!room) return <div className="text-center p-4">Room not found</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {room.devices.map((device, index) => {
        const Icon = deviceIcons[device.icon];
        const hasGauge = device.type === "light" || device.type === "temp";
        return (
          <motion.div
            key={device.id}
            className="bg-card-bg p-4 rounded-2xl shadow-md flex flex-col items-center backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:shadow-xl hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
          >
            <Icon
              className={`text-4xl mb-2 ${
                device.isOn ? "text-secondary" : "text-red-400"
              }`}
            />
            <p className="font-semibold text-center text-sm">{device.name}</p>
            {hasGauge && device.isOn && (
              <div className="w-full mt-2">
                <input
                  type="range"
                  min={device.min}
                  max={device.max}
                  value={device.value}
                  onChange={(e) =>
                    updateDeviceValue(
                      roomName,
                      device.id,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full accent-secondary"
                />
                <p className="text-xs text-center opacity-80">
                  {device.value}
                  {device.unit}
                </p>
              </div>
            )}
            <button
              onClick={() => toggleDevice(roomName, device.id)}
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
              <span
                className={`absolute right-[-2.5rem] text-xs font-medium ${
                  device.isOn ? "text-secondary" : "text-gray-400"
                }`}
              >
                {device.isOn}
              </span>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

DevicesGrid.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default DevicesGrid;
