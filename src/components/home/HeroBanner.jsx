import React, { useState } from "react";
import { Search } from "lucide-react";
import CollegeCard from "../college/CollegeCard";
import { useGetAllCollegesQuery } from "../../redux/feature/college/collegeApi";

const HeroBanner = () => {
  const { data } = useGetAllCollegesQuery({});

  const colleges = data?.data;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = colleges.filter((college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredColleges(results);
      setHasSearched(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="relative bg-linear-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your Future
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-gray-300 sm:text-xl">
              Search and explore top colleges. Book campus tours, connect with
              admissions, and find your perfect match.
            </p>

            <div className="mx-auto mt-10 max-w-2xl">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for a college name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="h-14 w-full rounded-lg border border-gray-700 bg-white/10 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="h-14 rounded-lg bg-blue-600 px-8 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasSearched && (
        <div className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {filteredColleges.length > 0 ? (
              <>
                <h2 className="mb-8 text-2xl font-bold text-gray-900">
                  Search Results ({filteredColleges.length})
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredColleges.map((college) => (
                    <CollegeCard key={college?._id} college={college} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No colleges found matching "{searchQuery}". Try a different
                  search term.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
