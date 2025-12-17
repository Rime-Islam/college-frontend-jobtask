import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useGetAllCollegesQuery } from "../../redux/feature/college/collegeApi";
import CollegeCard from "../../components/college/CollegeCard";

const College = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // you can make this dynamic if needed
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useGetAllCollegesQuery({
    page,
    limit,
    searchTerm,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin mr-2" /> Loading Colleges...
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {(error)?.data?.message || "Failed to fetch colleges"}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Colleges</h1>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search colleges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full max-w-md"
        />
        <button
          onClick={() => setPage(1)} // reset page when searching
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      {/* College Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.data?.map((college) => (
          <CollegeCard key={college?._id} college={college} />
        ))}
      </div>

      {/* Pagination */}
      {data?.totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-md ${
                  p === page ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default College;
