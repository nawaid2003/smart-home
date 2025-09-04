import PropTypes from "prop-types";
import { MdThermostat, MdEnergySavingsLeaf } from "react-icons/md";
import { motion } from "framer-motion";

function Dashboard({
  greeting,
  temperature,
  condition,
  energyUsage,
  unit,
  toggleUnit,
  loading,
  error,
}) {
  console.log("Dashboard rendering:", {
    loading,
    error,
    temperature,
    condition,
  });
  return (
    <div className="mb-6">
      <motion.h1
        className="text-2xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {greeting}
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          className="bg-card-bg p-6 rounded-2xl shadow-xl flex items-center justify-center backdrop-blur-md border border-white/10 dark:border-white/5"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-center">
            <MdThermostat className="text-4xl mb-2 text-accent mx-auto" />
            {loading ? (
              <p className="text-lg">Loading...</p>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <>
                <p className="text-3xl font-bold">
                  {temperature}°{unit}
                </p>
                <p className="text-sm opacity-80">{condition} in Bangalore</p>
                <button
                  onClick={toggleUnit}
                  className="mt-2 text-sm text-secondary underline hover:opacity-80 transition-opacity"
                >
                  Switch to °{unit === "C" ? "F" : "C"}
                </button>
              </>
            )}
          </div>
        </motion.div>
        <motion.div
          className="bg-card-bg p-6 rounded-2xl shadow-xl flex items-center justify-between backdrop-blur-md border border-white/10 dark:border-white/5"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 w-full">
            <MdEnergySavingsLeaf className="text-3xl text-secondary flex-shrink-0" />
            <div>
              <p className="text-lg font-semibold">Energy Usage</p>
              <p className="text-sm opacity-80">{energyUsage}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  greeting: PropTypes.string.isRequired,
  temperature: PropTypes.number,
  condition: PropTypes.string,
  energyUsage: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  toggleUnit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default Dashboard;
