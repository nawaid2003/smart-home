import { useSmartHome } from "../context/SmartHomeContext";
import PropTypes from "prop-types";
import {
  MdLiving,
  MdBedroomParent,
  MdKitchen,
  MdBathroom,
  MdWork,
} from "react-icons/md";
import { motion } from "framer-motion";

const roomIcons = {
  MdLiving: MdLiving,
  MdBedroomParent: MdBedroomParent,
  MdKitchen: MdKitchen,
  MdBathroom: MdBathroom,
  MdWork: MdWork,
};

function RoomsList({ selectedRoom, setSelectedRoom }) {
  const { rooms } = useSmartHome();

  return (
    <div className="flex overflow-x-auto space-x-4 mb-6 pb-2 snap-x snap-mandatory hide-scrollbar">
      {rooms.map((room) => {
        const Icon = roomIcons[room.icon];
        return (
          <motion.div
            key={room.name}
            onClick={() => setSelectedRoom(room.name)}
            className={`flex-shrink-0 w-28 h-36 rounded-2xl cursor-pointer shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              selectedRoom === room.name
                ? "scale-105 shadow-2xl  ring-opacity-50"
                : ""
            }`}
            style={{
              backgroundImage: `url(${room.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full bg-black/30 dark:bg-black/40 flex flex-col items-center justify-center p-2">
              <Icon className="text-4xl mb-2 text-white" />
              <p className="text-center font-semibold text-sm text-white">
                {room.name}
              </p>
              <p className="text-center text-xs opacity-80 text-white">
                {room.activeCount} active
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

RoomsList.propTypes = {
  selectedRoom: PropTypes.string.isRequired,
  setSelectedRoom: PropTypes.func.isRequired,
};

export default RoomsList;
