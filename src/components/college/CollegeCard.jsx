import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";

const CollegeCard = ({ college }) => {
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentToken);
  const handleViewDetails = () => {
    if (!user) {
      navigate("/login");
    }
  };
  const formatAdmissionDates = () => {
    if (!college?.admissionDates) return "Dates not available";

    const startDate = new Date(
      college?.admissionDates.startDate
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endDate = new Date(college?.admissionDates.endDate).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );

    return `${startDate} - ${endDate}`;
  };

  // Render star rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(college?.rating);
    const hasHalfStar = college?.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★½
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* College Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            college?.image?.location ||
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
          alt={college?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {college?.rating}/5
        </div>
      </div>

      {/* College Info */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">{college?.name}</h3>
          <div className="text-yellow-500">{renderRating()}</div>
        </div>

        <div className="mt-2 flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">
            {college?.location?.city}, {college?.location?.country}
          </span>
        </div>

        <div className="mt-3 text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Admission: {formatAdmissionDates()}</span>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span>Research: {college?.numberOfResearch || 0} publications</span>
          </div>
        </div>

        <p className="mt-3 text-gray-600 text-sm line-clamp-2">
          {college?.description || "No description available"}
        </p>

        <div className="mt-5">
          {user ? (
            <Link
              to={`/colleges/${college?._id}`}
              className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              View Details
            </Link>
          ) : (
            <button
              onClick={handleViewDetails}
              className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
