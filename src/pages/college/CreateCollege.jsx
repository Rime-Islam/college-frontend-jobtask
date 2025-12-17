import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useCreateCollegeMutation } from '../../redux/feature/college/collegeApi';
import { Plus, Trash2, Image as ImageIcon, X, AlertCircle, Loader2 } from 'lucide-react';

const CreateCollege = () => {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      rating: 0,
      admissionDates: {
        startDate: '',
        endDate: '',
        session: ''
      },
      events: [],
      researchHistory: [],
      sports: [],
      location: { city: '', country: '' },
      description: '',
      contact: { email: '', phone: '', website: '' }
    }
  });

  const { fields: eventFields, append: appendEvent, remove: removeEvent } = useFieldArray({
    control,
    name: 'events'
  });

  const { fields: researchFields, append: appendResearch, remove: removeResearch } = useFieldArray({
    control,
    name: 'researchHistory'
  });

  const { fields: sportFields, append: appendSport, remove: removeSport } = useFieldArray({
    control,
    name: 'sports'
  });

  // Image states
  const [collegeImage, setCollegeImage] = useState(null);
  const [collegeImagePreview, setCollegeImagePreview] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  
  // Event images - Store as array to maintain order
  const [eventImages, setEventImages] = useState([]);

  const [createCollege, { isLoading }] = useCreateCollegeMutation();

  // Watch research history to calculate numberOfResearch
  const researchHistory = watch('researchHistory');
  const numberOfResearch = researchHistory?.length || 0;

  const handleCollegeImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageErrors(prev => ({ ...prev, collegeImage: 'Invalid image type' }));
      return;
    }

    setCollegeImage(file);
    setImageErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.collegeImage;
      return newErrors;
    });

    const reader = new FileReader();
    reader.onloadend = () => setCollegeImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeCollegeImage = () => {
    setCollegeImage(null);
    setCollegeImagePreview('');
  };

  const handleEventImageChange = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Invalid image type');
      return;
    }

    setEventImages(prev => {
      const newImages = [...prev];
      newImages[index] = file;
      return newImages;
    });
  };

  const removeEventImage = (index) => {
    setEventImages(prev => {
      const newImages = [...prev];
      newImages[index] = null;
      return newImages;
    });
  };

  const onSubmit = async (data) => {
    if (!collegeImage) {
      setImageErrors(prev => ({ ...prev, collegeImage: 'College image is required' }));
      return;
    }

    try {
      const formData = new FormData();

      // Prepare the college data object
      const collegeData = {
        name: data.name,
        rating: Number(data.rating),
        admissionDates: {
          startDate: data.admissionDates.startDate,
          endDate: data.admissionDates.endDate,
          session: data.admissionDates.session
        },
        numberOfResearch: numberOfResearch,
        location: data.location,
        description: data.description,
        contact: data.contact,
        events: data.events.map((event, index) => ({
          name: event.name,
          description: event.description,
          date: event.date,
          venue: event.venue,
          category: event.category,
          hasImage: !!eventImages[index]
        })),
        researchHistory: data.researchHistory.map(research => ({
          title: research.title,
          authors: [],
          description: research.description,
          publicationDate: research.publicationDate,
          paperLink: research.paperLink,
          department: research.department
        })),
        sports: data.sports.map(sport => ({
          name: sport.name,
          category: sport.category,
          achievements: typeof sport.achievements === 'string' 
            ? sport.achievements.split(',').map(a => a.trim()).filter(Boolean)
            : sport.achievements,
          coachName: sport.coachName || undefined
        }))
      };
console.log(collegeData)
      // Append JSON data
      formData.append('data', JSON.stringify(collegeData));

      // Append college image
      formData.append('image', collegeImage);

      // ✅ FIX: Append event images with the same field name 'eventImages'
      // Backend expects all event images under the same field name
      eventImages.forEach((file, index) => {
        if (file) {
          formData.append('eventImages', file);
        }
      });

      console.log('FormData being sent:');
      console.log('- College Image:', collegeImage?.name);
      console.log('- Event Images count:', eventImages.filter(f => f).length);
      console.log('- Data:', collegeData);

      const res = await createCollege(formData).unwrap();
      alert(res.message || 'College created successfully!');
      
      // Reset form after success
      window.location.reload();
    } catch (error) {
      console.error('Error creating college:', error);
      alert(error?.data?.message || 'Failed to create college');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New College</h1>
        
        <div className="space-y-8">
          {/* College Image */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">College Image *</h2>
            
            {collegeImagePreview ? (
              <div className="relative w-64">
                <img 
                  src={collegeImagePreview} 
                  alt="College preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeCollegeImage}
                  className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center hover:border-blue-500 transition">
                  <ImageIcon className="mx-auto mb-2 text-gray-400" size={48} />
                  <p className="text-gray-600">Click to upload college image</p>
                </div>
                <input 
                  type="file" 
                  hidden 
                  accept="image/*"
                  onChange={handleCollegeImageChange} 
                />
              </label>
            )}

            {imageErrors.collegeImage && (
              <p className="text-red-500 text-sm flex items-center gap-1 mt-2">
                <AlertCircle size={14} />
                {imageErrors.collegeImage}
              </p>
            )}
          </section>

          {/* Basic Information */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
                <input
                  {...register('name', { required: 'College name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter college name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...register('rating', { required: 'Rating is required', min: 0, max: 5 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.0 - 5.0"
                />
                {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Research</label>
                <input
                  type="number"
                  value={numberOfResearch}
                  readOnly
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  placeholder="Auto-calculated"
                />
                <p className="text-xs text-gray-500 mt-1">Automatically calculated from research entries</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter college description"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
          </section>

          {/* Location */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  {...register('location.city', { required: 'City is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                />
                {errors.location?.city && <p className="text-red-500 text-xs mt-1">{errors.location.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <input
                  {...register('location.country', { required: 'Country is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter country"
                />
                {errors.location?.country && <p className="text-red-500 text-xs mt-1">{errors.location.country.message}</p>}
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  {...register('contact.email', { required: 'Email is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="college@example.com"
                />
                {errors.contact?.email && <p className="text-red-500 text-xs mt-1">{errors.contact.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  {...register('contact.phone', { required: 'Phone is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1234567890"
                />
                {errors.contact?.phone && <p className="text-red-500 text-xs mt-1">{errors.contact.phone.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  {...register('contact.website')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://www.college.edu"
                />
              </div>
            </div>
          </section>

          {/* Admission Dates */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Admission Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  {...register('admissionDates.startDate', { required: 'Start date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.admissionDates?.startDate && <p className="text-red-500 text-xs mt-1">{errors.admissionDates.startDate.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                <input
                  type="date"
                  {...register('admissionDates.endDate', { required: 'End date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.admissionDates?.endDate && <p className="text-red-500 text-xs mt-1">{errors.admissionDates.endDate.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session *</label>
                <input
                  {...register('admissionDates.session', { required: 'Session is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Fall 2024"
                />
                {errors.admissionDates?.session && <p className="text-red-500 text-xs mt-1">{errors.admissionDates.session.message}</p>}
              </div>
            </div>
          </section>

          {/* Events */}
          <section className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Events</h2>
              <button
                type="button"
                onClick={() => appendEvent({ name: '', description: '', date: '', venue: '', category: 'other' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Plus size={16} /> Add Event
              </button>
            </div>
            
            {eventFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-700">Event {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => {
                      removeEvent(index);
                      removeEventImage(index);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Event Image Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Image (Optional)</label>
                  {eventImages[index] ? (
                    <div className="relative w-32">
                      <img 
                        src={URL.createObjectURL(eventImages[index])} 
                        alt={`Event ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeEventImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="w-32 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                      <ImageIcon size={24} className="text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Upload</span>
                      <input 
                        type="file" 
                        hidden 
                        accept="image/*"
                        onChange={(e) => handleEventImageChange(index, e)} 
                      />
                    </label>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                    <input
                      {...register(`events.${index}.name`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Event name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      {...register(`events.${index}.date`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                    <input
                      {...register(`events.${index}.venue`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Event venue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      {...register(`events.${index}.category`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="other">Other</option>
                      <option value="cultural">Cultural</option>
                      <option value="academic">Academic</option>
                      <option value="sports">Sports</option>
                      <option value="technical">Technical</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      {...register(`events.${index}.description`)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Event description"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Research History */}
          <section className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Research History</h2>
                <p className="text-sm text-gray-500 mt-1">Total Research: {numberOfResearch}</p>
              </div>
              <button
                type="button"
                onClick={() => appendResearch({ title: '', authors: [], description: '', publicationDate: '', paperLink: '', department: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Plus size={16} /> Add Research
              </button>
            </div>
            
            {researchFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-700">Research {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeResearch(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      {...register(`researchHistory.${index}.title`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Research title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      {...register(`researchHistory.${index}.department`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Department"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                    <input
                      type="date"
                      {...register(`researchHistory.${index}.publicationDate`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paper Link</label>
                    <input
                      {...register(`researchHistory.${index}.paperLink`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      {...register(`researchHistory.${index}.description`)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Research description"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Sports */}
          <section className="pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Sports</h2>
              <button
                type="button"
                onClick={() => appendSport({ name: '', category: '', achievements: '', coachName: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Plus size={16} /> Add Sport
              </button>
            </div>
            
            {sportFields.map((field, index) => (
              <div key={field.id} className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-700">Sport {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeSport(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sport Name</label>
                    <input
                      {...register(`sports.${index}.name`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Basketball"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      {...register(`sports.${index}.category`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Team Sport"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coach Name</label>
                    <input
                      {...register(`sports.${index}.coachName`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Coach name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Achievements (comma-separated)</label>
                    <textarea
                      {...register(`sports.${index}.achievements`)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Achievement 1, Achievement 2, Achievement 3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Creating...
                </>
              ) : (
                'Create College'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollege;