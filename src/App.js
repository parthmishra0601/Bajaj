import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import FilterPanel from "./Components/FilterPanel";
import DoctorCard from "./Components/DoctorCard";
import SortOptions from "./Components/SortOptions";
import { useSearchParams } from "react-router-dom";

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  useEffect(() => {
    const search = searchParams.get("search")?.toLowerCase() || "";
    const gender = searchParams.get("gender");
    const specialty = searchParams.get("specialty");
    const sort = searchParams.get("sort");

    let result = [...doctors];

    if (search) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(search)
      );
    }

    if (gender) {
      result = result.filter((doc) => doc.gender === gender);
    }

    if (specialty) {
      result = result.filter((doc) => doc.specialty === specialty);
    }

    if (sort === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredDoctors(result);
  }, [searchParams, doctors]);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <SearchBar doctors={doctors} setSearchParams={setSearchParams} />
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <FilterPanel doctors={doctors} setSearchParams={setSearchParams} />
        <div className="flex-1">
          <SortOptions setSearchParams={setSearchParams} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filteredDoctors.map((doc, idx) => (
              <DoctorCard key={idx} doctor={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;