import React from "react";
import { useParams } from "react-router-dom";
import { Loader2, MapPin, Mail, Phone, Globe } from "lucide-react";
import { useGetCollegeByIdQuery } from "../../redux/feature/college/collegeApi";
import { CollegeReview } from "../../components/review/CollegeReview";

const CollegeDetails = () => {
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetCollegeByIdQuery(id);

  // Extract college data from the nested response structure
  const college = response?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin mr-2" /> Loading College Details...
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error?.data?.message || "Failed to fetch college details"}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* College Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={
            college?.image?.location ||
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
          alt={college?.name}
          className="w-full md:w-64 h-48 object-cover rounded-lg"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold">{college?.name}</h1>
          <p className="text-gray-600">{college?.description}</p>
          <p className="text-yellow-500 font-semibold">
            Rating: {college?.rating}/5
          </p>
        </div>
      </div>

      {/* Admission Dates */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Admission Dates</h2>
        <p>
          <strong>Session:</strong> {college?.admissionDates?.session}
        </p>
        <p>
          <strong>Start:</strong>{" "}
          {new Date(college?.admissionDates?.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End:</strong>{" "}
          {new Date(college?.admissionDates?.endDate).toLocaleDateString()}
        </p>
      </div>

      {/* Location & Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg bg-gray-50 space-y-1">
          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <p>
            <MapPin className="inline mr-1" /> {college?.location?.city},{" "}
            {college?.location?.country}
          </p>
        </div>
        <div className="border p-4 rounded-lg bg-gray-50 space-y-1">
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p>
            <Mail className="inline mr-1" /> {college?.contact?.email}
          </p>
          <p>
            <Phone className="inline mr-1" /> {college?.contact?.phone}
          </p>
          {college?.contact?.website && (
            <p>
              <Globe className="inline mr-1" />{" "}
              <a
                href={college?.contact?.website}
                target="_blank"
                className="text-blue-600"
              >
                {college?.contact?.website}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Events */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Events</h2>
        {college?.events?.length === 0 ? (
          <p className="text-gray-500">No events available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {college?.events?.map((event, index) => (
              <div key={index} className="border p-4 rounded-lg bg-gray-50">
                {event?.image && (
                  <img
                    src={event?.image.location}
                    alt={event?.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <h3 className="font-semibold">{event?.name}</h3>
                <p className="text-gray-600">{event?.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event?.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Venue:</strong> {event?.venue}
                </p>
                <p>
                  <strong>Category:</strong> {event?.category}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Research History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Research History</h2>
        {college?.researchHistory?.length === 0 ? (
          <p className="text-gray-500">No research history available</p>
        ) : (
          <div className="space-y-4">
            {college?.researchHistory?.map((research, index) => (
              <div key={index} className="border p-4 rounded-lg bg-gray-50">
                <h3 className="font-semibold">{research?.title}</h3>
                <p className="text-gray-600">{research?.description}</p>
                <p>
                  <strong>Department:</strong> {research?.department}
                </p>
                <p>
                  <strong>Publication Date:</strong>{" "}
                  {new Date(research?.publicationDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Paper:</strong>{" "}
                  <a
                    href={research?.paperLink}
                    target="_blank"
                    className="text-blue-600"
                  >
                    {research?.paperLink}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sports */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Sports</h2>
        {college?.sports?.length === 0 ? (
          <p className="text-gray-500">No sports available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {college?.sports?.map((sport, index) => (
              <div key={index} className="border p-4 rounded-lg bg-gray-50">
                <h3 className="font-semibold">{sport?.name}</h3>
                <p>
                  <strong>Category:</strong> {sport?.category}
                </p>
                {sport?.coachName && (
                  <p>
                    <strong>Coach:</strong> {sport?.coachName}
                  </p>
                )}
                {sport?.achievements.length > 0 && (
                  <p>
                    <strong>Achievements:</strong>{" "}
                    {sport?.achievements?.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <CollegeReview collegeId={college?._id} />
      </div>
    </div>
  );
};

export default CollegeDetails;
