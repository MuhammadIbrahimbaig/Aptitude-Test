import { useEffect, useState } from "react";
import axios from "axios";


export default function Services() {
  const [services, setServices] = useState([]);
  

  // Gradient color list 
  const gradients = [
    "from-fuchsia-600 to-purple-600",
    "from-cyan-400 to-blue-600",
    "from-emerald-400 to-teal-600",
    "from-red-400 to-orange-500",
    "from-purple-500 to-pink-500",
    "from-indigo-400 to-purple-600",
    "from-yellow-400 to-orange-500",
    "from-pink-400 to-red-500",
    "from-teal-400 to-green-500",
    "from-blue-400 to-indigo-600",
    "from-green-400 to-blue-500",
    "from-orange-400 to-pink-600",
    "from-sky-400 to-cyan-600",
    "from-lime-400 to-green-600",
    "from-rose-400 to-pink-600",
  ];

  async function fetchServices() {
    try {
      let response = await axios.get("http://localhost:4001/Mywork/ServiceGet");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h6 className="text-primary uppercase font-semibold">Our Services</h6>
          <h1 className="text-3xl font-bold">
            Explore Our <span className="text-primary uppercase">Services</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.length > 0 ? (
            services.map((service, index) => {
              const gradient = gradients[index % gradients.length]; // har card ke liye unique gradient

              return (
            <div
  key={service._id}
  className="bg-white  shadow-lg overflow-hidden rounded-xl transform hover:scale-105 transition duration-300 flex flex-col"
>
  {/* Gradient Top Section */}
  <div
    className={`bg-gradient-to-r ${gradient} text-white  shadow-lg rounded-b-xl text-center py-10`}
  >
    <h3 className="text-xl font-bold">{service.title}</h3>
  </div>

  {/* White Bottom Section */}
  <div className="bg-white text-center px-6 py-6 flex flex-col flex-grow">
    {/* Description with 3 line limit */}
    <p className="text-gray-700 text-[20px] mb-4 line-clamp-3">
      {service.description}
    </p>

    {/* Spacer + Button (always bottom) */}
    <div className="mt-auto">
      <button
        className={` 
          relative z-[2] text-white py-2 px-6 w-full text-base leading-[1.1] font-bold tracking-wide uppercase
          inline-flex items-center justify-center gap-3 rounded-full overflow-hidden
          bg-gradient-to-r ${gradient}
          after:absolute after:h-full after:w-0 after:bottom-0 after:right-0 after:bg-black/30
          after:-z-1 after:[transition:all_.3s_ease-in-out]
          hover:after:w-full hover:after:left-0 hover:text-white
          after:duration-350 after:delay-150
        `}
      >
        Learn More
      </button>
    </div>
  </div>
</div>

              );
            })
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No services available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
