// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// export default function AboutUs() {
//   const fadeIn = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100">
//       {/* Hero Section */}
//       <section className="relative h-[500px] overflow-hidden">
//         <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
//           <div className="relative h-full">
//             <img
//               src="/images/LandingPage/1view.webp"
//               alt="Luxury beachfront property"
//               className="h-full w-full object-cover rounded-lg"
//             />
//           </div>
//           <div className="grid grid-rows-2 gap-4">
//             <img
//               src="/images/LandingPage/2view.webp"
//               alt="Pool villa"
//               className="h-full w-full object-cover rounded-lg"
//             />
//             <img
//               src="/images/LandingPage/3view.webp"
//               alt="Mountain resort"
//               className="h-full w-full object-cover rounded-lg"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-16 relative z-10 -mt-20">
//         <motion.div
//           className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={fadeIn}
//         >
//           <div className="text-center max-w-3xl mx-auto mb-10">
//             <h1 className="text-4xl font-bold mb-4 text-blue-700">
//               About Codeta
//             </h1>
//             <p className="text-lg text-gray-600">
//               Codeta is committed to making real estate investments
//               accessible to everyone, offering a unique approach that enables
//               investors to start from as little as one square meter. Our mission
//               is to democratize real estate investments by providing a platform
//               that prioritizes accessibility, transparency, and consistent
//               returns.
//             </p>
//           </div>

//           {/* Our Values */}
//           <div className="grid md:grid-cols-3 gap-8 mb-16">
//             {[
//               {
//                 icon: "🌍",
//                 title: "Accessibility",
//                 description:
//                   "Invest from just one square meter, opening doors to real estate investment for everyone, regardless of budget.",
//               },
//               {
//                 icon: "📊",
//                 title: "Attractive Returns",
//                 description:
//                   "Enjoy an estimated 9% annual appreciation and 7.5% annual rental yield, providing a stable and predictable income.",
//               },
//               {
//                 icon: "💼",
//                 title: "Professional Management",
//                 description:
//                   "We handle everything, from property selection and acquisition to development and profit distribution.",
//               },
//             ].map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 className="bg-white rounded-lg shadow-lg p-6 text-center"
//               >
//                 <div className="text-3xl mb-4">{value.icon}</div>
//                 <h3 className="text-xl font-semibold text-blue-700 mb-2">
//                   {value.title}
//                 </h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Why Invest with Us */}
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: "🔐",
//                 title: "Security",
//                 description:
//                   "Investments are safeguarded by robust legal and security frameworks to protect your assets.",
//               },
//               {
//                 icon: "📈",
//                 title: "Real-Time Insights",
//                 description:
//                   "Stay up-to-date with the latest performance and investment status directly from our platform.",
//               },
//               {
//                 icon: "💡",
//                 title: "Transparency",
//                 description:
//                   "Clear and continuous updates keep you informed about every step of your investment journey.",
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-blue-700 hover:text-white transition-all duration-300"
//               >
//                 <div className="text-3xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p>{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Call to Action */}
//         <motion.div
//           className="text-center mt-16"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl font-bold mb-4 text-blue-700">
//             Join the Future of Real Estate Investment
//           </h2>
//           <p className="text-lg text-gray-600 mb-8">
//             Become a part of Codeta and start building your real estate
//             portfolio with ease and confidence.
//           </p>
//           <button className="bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
//             Get Started Today
//           </button>
//         </motion.div>
//       </main>
//     </div>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import Footer from "../../Layout/LandingPage/Footer";
import Header from "./AboutHeader";
import { Link } from 'react-router-dom';
export default function AboutUs() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100">
      {/* Hero Section */}
      <Header/>
      <section className="relative h-auto md:h-[700px] overflow-hidden mt-20">
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          <motion.div
            className="relative h-[250px] md:h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img
              src="/images/LandingPage/1view.webp"
              alt="Luxury beachfront property"
              className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </motion.div>
          <motion.div
            className="relative h-[250px] md:h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src="/images/LandingPage/2view.webp"
              alt="Pool villa"
              className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </motion.div>
          <motion.div
            className="relative h-[250px] md:h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src="/images/LandingPage/3view.webp"
              alt="Mountain resort"
              className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 relative z-10 -mt-28 md:-mt-32">
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6 text-blue-700">
              About Codeta
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Codeta is committed to making real estate investments
              accessible to everyone, offering a unique approach that enables
              investors to start from as little as one square meter. Our mission
              is to democratize real estate investments by providing a platform
              that prioritizes accessibility, transparency, and consistent
              returns.
            </p>
          </div>

          {/* Process Steps */}
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              {
                icon: "🏢",
                title: "Register and Verify",
                description:
                  "Quick verification process to access our investment platform securely.",
              },
              {
                icon: "🔍",
                title: "Explore Properties",
                description:
                  "Browse our curated selection of high-growth properties with proven returns.",
              },
              {
                icon: "📈",
                title: "Start Investing",
                description:
                  "Invest from as little as 1 sq meter and track your portfolio growth.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
              >
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              {
                icon: "🛡️",
                title: "Secure Investment",
                description:
                  "Your investments are protected by advanced security measures and legal frameworks.",
              },
              {
                icon: "⏰",
                title: "Real-Time Updates",
                description:
                  "Stay informed with live updates on your investment performance and property status.",
              },
              {
                icon: "👥",
                title: "Expert Management",
                description:
                  "Our team of professionals handles all aspects of property management.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-700">
            Join the Future of Real Estate Investment
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Become a part of Codeta and start building your real estate
            portfolio with ease and confidence.
          </p>
          <Link to="/market" className="bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
            Get Started Today
          </Link>
        </motion.div>
      </main>
      <Footer/>
    </div>
  );
}
