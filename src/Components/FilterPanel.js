import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FilterPanel = ({ doctors, setSearchParams }) => {
  const specialties = Array.from(
    new Set(doctors.flatMap((d) => d.specialities).filter(Boolean).map(s => s.name)) // Extract name from speciality object
  ).sort();

  const updateParams = (type, value, isMulti = false) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (isMulti) {
        const existing = newParams.get(type)?.split(",") || [];
        if (existing.includes(value)) {
          const updated = existing.filter((v) => v !== value);
          updated.length ? newParams.set(type, updated.join(",")) : newParams.delete(type);
        } else {
          existing.push(value);
          newParams.set(type, existing.join(","));
        }
      } else {
        value ? newParams.set(type, value) : newParams.delete(type);
      }
      return newParams;
    });
  };

  // Animation variants
  const panelVariants = {
    open: { x: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 100 } },
  };

  const sectionVariants = {
    open: { opacity: 1, transition: { staggerChildren: 0.1 } },
    closed: { opacity: 0 },
  };

  const itemVariants = {
    open: { y: 0, opacity: 1, transition: { duration: 0.2 } },
    hover: { scale: 1.02, backgroundColor: "#f3f4f6" },
  };

  return (
    <motion.div
      className="w-1/5 p-6 shadow-md bg-white z-20"
      variants={panelVariants}
      initial={{ x: -20, opacity: 0 }}
      animate="open"
    >
      {/* DoctorConnect Heading */}
      <motion.h2 className="text-3xl font-bold text-indigo-700 mb-8">
        DoctorConnect
      </motion.h2>

      {/* Consultation Type */}
      <motion.div className="mb-8" variants={sectionVariants}>
        <motion.h3 className="text-2xl font-semibold mb-4 text-gray-900">
          Consultation Type
        </motion.h3>
        {["Video Consult", "In Clinic"].map((type, index) => (
          <motion.label
            key={index}
            className="flex items-center space-x-3 mb-3 cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
          >
            <input
              type="radio"
              name="consultation"
              className="form-radio h-6 w-6 text-indigo-600"
              onChange={() => updateParams("consult", type.toLowerCase())}
            />
            <span className="text-xl text-gray-800">{type}</span>
          </motion.label>
        ))}
      </motion.div>

      {/* Specialties Dropdown */}
      <motion.div className="mb-8" variants={sectionVariants}>
        <motion.h3 className="text-2xl font-semibold mb-4 text-gray-900">
          Specialties
        </motion.h3>
        <motion.select
          className="form-select w-full text-xl text-gray-800"
          onChange={(e) => updateParams("speciality", e.target.value)}
        >
          <option value="">Select a Specialty</option>
          {specialties.map((spec, index) => (
            <option key={index} value={spec.toLowerCase()} className="capitalize">
              {spec}
            </option>
          ))}
        </motion.select>
      </motion.div>

      {/* Availability */}
      <motion.div className="mb-8" variants={sectionVariants}>
        <motion.h3 className="text-2xl font-semibold mb-4 text-gray-900">
          Availability
        </motion.h3>
        {["Today", "Tomorrow", "This Week"].map((day, index) => (
          <motion.label
            key={index}
            className="flex items-center space-x-3 mb-3 cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
          >
            <input
              type="checkbox"
              className="form-checkbox h-6 w-6 text-indigo-600"
              onChange={() => updateParams("availability", day.toLowerCase(), true)}
            />
            <span className="text-xl text-gray-800">{day}</span>
          </motion.label>
        ))}
      </motion.div>

      {/* Price Range */}
      <motion.div variants={sectionVariants}>
        <motion.h3 className="text-2xl font-semibold mb-4 text-gray-900">
          Price Range
        </motion.h3>
        <input
          type="range"
          min="100"
          max="5000"
          step="100"
          className="w-full"
          onChange={(e) => updateParams("price", e.target.value)}
        />
      </motion.div>
    </motion.div>
  );
};

export default FilterPanel;