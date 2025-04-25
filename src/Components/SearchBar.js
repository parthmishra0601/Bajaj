import React, { useState } from "react";

const SearchBar = ({ doctors, setSearchParams }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const filtered = doctors
      .filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);  // Displaying 5 suggestions for better UX
    setSuggestions(filtered);
  };

  const applySearch = (name) => {
    setSearchParams((prev) => {
      prev.set("search", name);
      return prev;
    });
    setInput("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full md:w-1/2 mx-auto">
      <input
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 ease-in-out"
        placeholder="Search doctor by name"
        value={input}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && applySearch(input)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="p-3 hover:bg-indigo-50 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => applySearch(s.name)}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
