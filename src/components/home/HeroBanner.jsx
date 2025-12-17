import React, { useState } from "react";
import { Search } from "lucide-react";
import CollegeCard from "../college/CollegeCard";

const colleges = [
  {
    id: 1,
    name: "Stanford University",
    location: "Stanford, CA",
    type: "Private",
    ranking: "#3 National",
    image: "/stanford-university-campus.png",
    description: "A leading research university known for innovation and entrepreneurship.",
    acceptanceRate: "4%",
  },
  {
    id: 2,
    name: "MIT",
    location: "Cambridge, MA",
    type: "Private",
    ranking: "#2 National",
    image: "/mit-campus-building.jpg",
    description: "World-renowned for engineering, technology, and scientific research.",
    acceptanceRate: "4%",
  },
  {
    id: 3,
    name: "Harvard University",
    location: "Cambridge, MA",
    type: "Private",
    ranking: "#1 National",
    image: "/harvard-university-campus.png",
    description: "America's oldest university with unparalleled academic excellence.",
    acceptanceRate: "3%",
  },
  {
    id: 4,
    name: "UC Berkeley",
    location: "Berkeley, CA",
    type: "Public",
    ranking: "#1 Public",
    image: "/uc-berkeley-campus.jpg",
    description: "Leading public research university with cutting-edge programs.",
    acceptanceRate: "14%",
  },
  {
    id: 5,
    name: "Yale University",
    location: "New Haven, CT",
    type: "Private",
    ranking: "#5 National",
    image: "/yale-university-campus.jpg",
    description: "Prestigious Ivy League institution with strong liberal arts tradition.",
    acceptanceRate: "5%",
  },
  {
    id: 6,
    name: "Princeton University",
    location: "Princeton, NJ",
    type: "Private",
    ranking: "#1 National",
    image: "/princeton-university-campus.jpg",
    description: "Elite university focused on undergraduate education and research.",
    acceptanceRate: "4%",
  },
];

const HeroBanner = () => {
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
              Search and explore top colleges. Book campus tours, connect with admissions, and find your perfect match.
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
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No colleges found matching "{searchQuery}". Try a different search term.
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