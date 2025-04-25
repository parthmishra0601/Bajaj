import React from "react";
import { motion } from "framer-motion";

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null;

  const {
    name = "Unknown",
    photo = "https://via.placeholder.com/150",
    specialities = [],
    fees = "N/A",
    experience = "N/A",
    languages = [],
    clinic = {},
    video_consult = false,
    in_clinic = false,
    doctor_introduction = "",
  } = doctor;

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.98 },
  };

  const imageVariants = {
    hover: { scale: 1.05 },
  };

  const availabilityVariants = {
    available: { backgroundColor: "#d4edda", color: "#155724" },
    unavailable: { backgroundColor: "#f8d7da", color: "#721c24" },
  };

  const isAvailable = video_consult || in_clinic;

  return (
    <motion.div
      className="border p-4 rounded-xl shadow-md bg-white flex gap-4"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={photo}
        alt={name}
        className="w-24 h-24 rounded-full object-cover border"
        variants={imageVariants}
        whileHover="hover"
        transition={{ duration: 0.2 }}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-indigo-700">{name}</h2>
          <motion.span
            className={`text-sm font-medium px-2 py-1 rounded`}
            variants={availabilityVariants}
            animate={isAvailable ? "available" : "unavailable"}
            transition={{ duration: 0.3 }}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </motion.span>
        </div>

        <p className="mt-1 text-gray-600">
          <strong>Specialities:</strong>{" "}
          {specialities.map(s => s?.name).filter(Boolean).join(", ") || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Fees:</strong> {fees}
        </p>
        <p className="text-gray-600">
          <strong>Experience:</strong> {experience}
        </p>
        <p className="text-gray-600">
          <strong>Languages:</strong> {languages.join(", ") || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Clinic:</strong> {clinic?.name || "N/A"}
        </p>
        {doctor_introduction && (
          <p className="text-gray-600">
            <strong>Introduction:</strong> {doctor_introduction}
          </p>
        )}

        <div className="mt-4 flex justify-between items-center">
          {video_consult && (
            <motion.button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 mr-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Video Consult
            </motion.button>
          )}

          {in_clinic && (
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              In Clinic Visit
            </motion.button>
          )}

          <motion.button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Appointment
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;