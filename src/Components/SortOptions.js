import React from "react";

const SortOptions = ({ setSearchParams }) => {
  const handleSort = (key) => {
    setSearchParams((prev) => {
      prev.set("sort", key);
      return prev;
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <span className="font-semibold">Sort By:</span>
      <button
        className="text-blue-600 underline"
        onClick={() => handleSort("fees")}
      >
        Fees (Low to High)
      </button>
      <button
        className="text-blue-600 underline"
        onClick={() => handleSort("experience")}
      >
        Experience (High to Low)
      </button>
    </div>
  );
};

export default SortOptions;
