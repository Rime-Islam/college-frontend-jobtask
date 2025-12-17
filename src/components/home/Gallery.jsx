import React from "react";

const Gallery = () => {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">GRADUATION GALLERY</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Celebrating Our Graduates
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-6 text-lg">
              A collection of memorable moments from our graduation ceremonies across different departments
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Engineering Graduates */}
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Engineering graduates"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">
                    Engineering Graduates
                  </h3>
                  <p className="text-white/80 mt-1">Class of 2023</p>
                </div>
              </div>
            </div>
            
            {/* Business School Graduates */}
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Business school graduates"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">Business School</h3>
                  <p className="text-white/80 mt-1">Spring Graduation</p>
                </div>
              </div>
            </div>
            
            {/* Medical School Graduates */}
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="https://www.edgehill.ac.uk/wp-content/uploads/2025/08/Medical-School-graduates-web.jpg"
                alt="Medical school graduates"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">
                    Medical School
                  </h3>
                  <p className="text-white/80 mt-1">White Coat Ceremony</p>
                </div>
              </div>
            </div>

            {/* Liberal Arts Graduates */}
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Liberal arts graduates"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">
                    Liberal Arts
                  </h3>
                  <p className="text-white/80 mt-1">Honors Convocation</p>
                </div>
              </div>
            </div>
            
            {/* Science Graduates */}
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Science graduates"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">
                    Science Faculty
                  </h3>
                  <p className="text-white/80 mt-1">Research Symposium</p>
                </div>
              </div>
            </div>
            
            {/* Law School Graduates */}
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="https://www.simplylawjobs.com/storage/SLJ/uploads/hub/advices/501_1000/pexels-photo-267885-1-1.jpeg"
                alt="Law school graduates"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">
                    Law School
                  </h3>
                  <p className="text-white/80 mt-1">Hooding Ceremony</p>
                </div>
              </div>
            </div>

            {/* International Graduates */}
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="International graduates"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">
                    International Students
                  </h3>
                  <p className="text-white/80 mt-1">Global Graduation</p>
                </div>
              </div>
            </div>
            
            {/* Graduate Studies */}
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Graduate studies"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">
                    Graduate Studies
                  </h3>
                  <p className="text-white/80 mt-1">Doctoral Hooding</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="text-center mt-12">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
              View All Graduations
            </button>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Gallery;