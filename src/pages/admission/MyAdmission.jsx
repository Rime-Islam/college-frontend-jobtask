import React from "react";
import { toast } from "sonner";
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  BookOpen, 
  GraduationCap,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Star,
  Globe
} from "lucide-react";
import { useGetMyAdmissionQuery } from "../../redux/feature/admission/admissionApi";

const MyAdmission = () => {
  const { 
    data: admissions, 
    isLoading: admissionLoading, 
    isError: admissionError 
  } = useGetMyAdmissionQuery();
  
  const admission = admissions?.data;
  const college = admissions?.data[0]?.collegeId;

  if (admissionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <p className="mt-6 text-lg text-gray-700 font-medium">Loading your admission details...</p>
        </div>
      </div>
    );
  }

  if (admissionError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Admission</h2>
          <p className="text-gray-600 mb-6">
            We couldn't retrieve your admission details. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Admission Found</h2>
          <p className="text-gray-600 mb-6">
            You haven't submitted any admission applications yet.
          </p>
          <a 
            href="/admission" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
          >
            Apply Now
          </a>
        </div>
      </div>
    );
  }

  const statusConfig = {
    pending: {
      icon: <Clock className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-800",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      text: "Pending Review"
    },
    approved: {
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-green-100 text-green-800",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      text: "Approved"
    },
    rejected: {
      icon: <XCircle className="h-5 w-5" />,
      color: "bg-red-100 text-red-800",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      text: "Rejected"
    }
  };

  const statusInfo = statusConfig[admission.status] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Admission Details</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Track your application status and view all your admission information
          </p>
        </div>

        {/* Status Banner */}
        <div className={`mb-8 rounded-2xl p-6 ${statusInfo.bgColor} border ${statusInfo.borderColor} shadow-sm`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className={`p-3 rounded-full ${statusInfo.color} mr-4`}>
                {statusInfo.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Application Status</h2>
                <p className={`font-medium ${statusInfo.textColor}`}>{statusInfo.text}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600">Applied on</p>
              <p className="font-medium text-gray-900">
                {(new Date(admission.applicationDate), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal & Academic Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-gray-900">{admission.candidateName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                      <p className="font-medium text-gray-900">
                        {(new Date(admission.dateOfBirth), "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-blue-500" />
                        {admission.candidateEmail}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-medium text-gray-900 flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-blue-500" />
                        {admission.candidatePhone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="font-medium text-gray-900 flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-1 text-blue-500" />
                        {admission.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Application Date</p>
                      <p className="font-medium text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        {(new Date(admission.applicationDate), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Academic Information</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Subject of Interest</p>
                    <p className="font-medium text-gray-900">{admission.subject}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Application Documents</p>
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Admission Application</p>
                        <p className="text-sm text-gray-600">Submitted on {(new Date(admission.applicationDate), "MMMM d, yyyy")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - College Info */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">College Information</h2>
                </div>
              </div>
              <div className="p-6">
                {college ? (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center text-center">
                      {college.image && (
                        <img 
                          src={college.image.location} 
                          alt={college.name}
                          className="w-32 h-32 object-cover rounded-xl mb-4 shadow-md"
                        />
                      )}
                      <h3 className="text-xl font-bold text-gray-900">{college.name}</h3>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(college.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">
                          {college.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium text-gray-900">
                            {college.location.city}, {college.location.country}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">{college.contact.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">{college.contact.phone}</p>
                        </div>
                      </div>
                      
                      {college.contact.website && (
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <a 
                              href={college.contact.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Admission Period</p>
                          <p className="font-medium text-gray-900">
                            {(new Date(college.admissionDates.startDate), "MMM d")} - {" "}
                            {(new Date(college.admissionDates.endDate), "MMM d, yyyy")}
                          </p>
                          <p className="text-sm text-gray-600">{college.admissionDates.session}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <a 
                        href={`/college/${college._id}`}
                        className="block w-full text-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-md"
                      >
                        View College Details
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">College information not available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Details Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Application Status Details</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${statusInfo.color}`}>
                  {React.cloneElement(statusInfo.icon, { className: "h-10 w-10" })}
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Your application is {statusInfo.text.toLowerCase()}
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl">
                  {admission.status === 'pending' && 
                    "Your application is currently under review. The admissions committee will evaluate your qualifications and notify you of their decision soon. This process typically takes 2-4 weeks."}
                  {admission.status === 'approved' && 
                    "Congratulations! Your application has been approved. You will receive an email with further instructions regarding enrollment procedures, document submission, and next steps."}
                  {admission.status === 'rejected' && 
                    "We're sorry, but your application was not successful at this time. You may contact the admissions office for more information about their decision or feedback on your application."}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button 
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition shadow-sm"
                  >
                    Print Details
                  </button>
                  {admission.status === 'pending' && (
                    <button 
                      onClick={() => toast.info("Withdrawal feature coming soon!")}
                      className="px-6 py-3 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition border border-red-200"
                    >
                      Withdraw Application
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAdmission;