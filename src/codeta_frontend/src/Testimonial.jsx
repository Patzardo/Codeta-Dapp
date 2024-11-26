// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const testimonials = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     role: "CEO",
//     company: "TechCorp",
//     avatar: "/placeholder.svg?height=100&width=100",
//     quote:
//       "This product has revolutionized our workflow. It's an absolute game-changer for our team's productivity.",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     role: "Designer",
//     company: "CreativeCo",
//     avatar: "/placeholder.svg?height=100&width=100",
//     quote:
//       "I've never used a tool so intuitive and powerful. It's become an essential part of my design process.",
//   },
//   {
//     id: 3,
//     name: "Carol Davis",
//     role: "Marketing Director",
//     company: "GrowthInc",
//     avatar: "/placeholder.svg?height=100&width=100",
//     quote:
//       "The analytics features have given us invaluable insights. Our campaigns have never been more effective.",
//   },
// ];

// export default function TestimonialCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   useEffect(() => {
//     const timer = setInterval(nextTestimonial, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
//           {/* Quote Icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="mx-auto h-12 w-12 text-white opacity-80"
//             fill="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path d="M6 11h3V4H4v11h5v7h3v-7h2V4H6zm12 0h3V4h-5v11h5v7h3v-7h2V4h-8z" />
//           </svg>

//           {/* Testimonial Content */}
//           <AnimatePresence mode="wait">
//             <motion.figure
//               key={currentIndex}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.5 }}
//               className="mt-10"
//             >
//               <blockquote className="text-center text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
//                 <p className="relative">
//                   &ldquo;{testimonials[currentIndex].quote}&rdquo;
//                 </p>
//               </blockquote>
//               <figcaption className="mt-10 flex flex-col items-center justify-center">
//                 <div className="h-20 w-20 rounded-full bg-gray-300 shadow-lg overflow-hidden transition-transform duration-500 transform hover:scale-105">
//                   <img
//                     src={testimonials[currentIndex].avatar}
//                     alt={testimonials[currentIndex].name}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//                 <div className="mt-4 space-y-1">
//                   <div className="text-lg font-semibold text-white">
//                     {testimonials[currentIndex].name}
//                   </div>
//                   <div className="text-sm text-gray-200">
//                     {testimonials[currentIndex].role} at{" "}
//                     {testimonials[currentIndex].company}
//                   </div>
//                 </div>
//               </figcaption>
//             </motion.figure>
//           </AnimatePresence>

//           {/* Navigation Buttons */}
//           <div className="mt-10 flex justify-center space-x-4">
//             <button
//               onClick={prevTestimonial}
//               aria-label="Previous testimonial"
//               className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-40 transition-all duration-300"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 className="h-5 w-5"
//               >
//                 <path d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button
//               onClick={nextTestimonial}
//               aria-label="Next testimonial"
//               className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-40 transition-all duration-300"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 className="h-5 w-5"
//               >
//                 <path d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Juan Pérez,",
    role: "Lawyer",
    company: "",
    avatar: "/images/LandingPage/test1.webp",
    quote:
      "CODETA has allowed me to update my knowledge and adapt to the new legal landscape.",
  },
  {
    id: 2,
    name: "María Rodríguez",
    role: "Technology Manager",
    company: "",
    avatar: "/images/LandingPage/test2.webp",
    quote:
      "The classes are practical and relevant to my daily work.",
  },
  {
    id: 3,
    name: "Pedro González",
    role: " Law Student",
    company: "",
    avatar: "/images/LandingPage/test1.webp",
    quote:
      "CODETA's program has helped me understand the impact of technology on law.",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 sm:py-16" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide uppercase pb-6 sm:pb-8 md:pb-10">
            Testimonials from Our Students
          </h2>

          {/* Quote Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-white opacity-60 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 11h3V4H4v11h5v7h3v-7h2V4H6zm12 0h3V4h-5v11h5v7h3v-7h2V4h-8z" />
          </svg>

          {/* Testimonial Content */}
          <AnimatePresence mode="wait">
            <motion.figure
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-10"
            >
              <blockquote className="text-center text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9 shadow-md">
                <p className="relative">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-10 flex flex-col items-center justify-center">
                <div className="h-20 w-20 rounded-full shadow-xl overflow-hidden bg-gray-300 transition-transform duration-500 transform hover:scale-105 border-2 border-white">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-lg font-semibold text-white">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-gray-200">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-center space-x-4">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-40 transition-all duration-300 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-40 transition-all duration-300 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
