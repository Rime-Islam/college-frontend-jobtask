import React, { useState } from "react";
import { useGetAllCollegesQuery } from "../../redux/feature/college/collegeApi";
import { useCreateAdmissionMutation } from "../../redux/feature/admission/admissionApi";
import { toast } from "sonner";
import { Loader2, Mail, Phone, MapPin, Calendar, User, BookOpen, GraduationCap } from "lucide-react";

const Admission = () => {
  const { data: collegesData, isLoading } = useGetAllCollegesQuery({});
  const [createAdmission, { isLoading: submitting }] = useCreateAdmissionMutation();

  const [formData, setFormData] = useState({
    collegeId: "",
    candidateName: "",
    subject: "",
    candidateEmail: "",
    candidatePhone: "",
    address: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.collegeId) {
      toast.error("Please select a college");
      return;
    }
    
    try {
      await createAdmission(formData).unwrap();
      toast.success("Admission submitted successfully! We'll contact you soon.");
      setFormData({
        collegeId: "",
        candidateName: "",
        subject: "",
        candidateEmail: "",
        candidatePhone: "",
        address: "",
        dateOfBirth: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit admission.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">College Admission</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete the form below to apply for admission. All fields are required.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h2 className="text-2xl font-bold">Admission Application</h2>
            <p className="text-blue-100 mt-1">Please provide accurate information</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* College Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-blue-500" />
                Select College *
              </label>
              <select
                name="collegeId"
                value={formData?.collegeId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Choose a college</option>
                {collegesData?.data?.map((college) => (
                  <option key={college?._id} value={college?._id}>
                    {college?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
              
              <div className="space-y-2">
                <label className=" text-sm font-medium text-gray-700 flex items-center">
                  <User className="h-4 w-4 mr-2 text-blue-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="candidateName"
                  placeholder="John Doe"
                  value={formData?.candidateName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData?.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="candidateEmail"
                    placeholder="john@example.com"
                    value={formData?.candidateEmail}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-blue-500" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="candidatePhone"
                    placeholder="+1 (555) 123-4567"
                    value={formData?.candidatePhone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  Address *
                </label>
                <textarea
                  name="address"
                  placeholder="123 Main Street, City, Country"
                  value={formData?.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Academic Information</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  Subject of Interest *
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Computer Science, Business, etc."
                  value={formData?.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Submitting Application...
                  </>
                ) : (
                  "Submit Admission Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admission;